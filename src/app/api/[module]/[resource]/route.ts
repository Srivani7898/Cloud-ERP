import { created, fail, ok } from "@/lib/api/responses";
import { createRecord, filterRecords, getCollection, isBlockedModule } from "@/lib/api/erp-data";

type Params = Promise<{ module: string; resource: string }>;

export async function GET(request: Request, context: { params: Params }) {
  const { module, resource } = await context.params;
  if (isBlockedModule(module)) {
    return fail("Authentication APIs are intentionally excluded from this backend layer.", 403);
  }

  const collection = getCollection(module, resource);
  if (!collection) {
    return fail(`Unknown resource: ${module}/${resource}`, 404);
  }

  const url = new URL(request.url);
  const data = filterRecords(collection, url.searchParams);
  return ok({
    module,
    resource,
    count: data.length,
    total: collection.length,
    data,
  });
}

export async function POST(request: Request, context: { params: Params }) {
  const { module, resource } = await context.params;
  if (isBlockedModule(module)) {
    return fail("Authentication APIs are intentionally excluded from this backend layer.", 403);
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return fail("Request body must be valid JSON.", 400);
  }

  const record = createRecord(module, resource, payload);
  return created(record);
}
