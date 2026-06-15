import { deleteRecord, getCollection, isBlockedModule, updateRecord } from "@/lib/api/erp-data";
import { fail, ok } from "@/lib/api/responses";

type Params = Promise<{ module: string; resource: string; id: string }>;

export async function GET(_request: Request, context: { params: Params }) {
  const { module, resource, id } = await context.params;
  if (isBlockedModule(module)) {
    return fail("Authentication APIs are intentionally excluded from this backend layer.", 403);
  }

  const collection = getCollection(module, resource);
  if (!collection) return fail(`Unknown resource: ${module}/${resource}`, 404);

  const record = collection.find((item) => item.id === id);
  if (!record) return fail(`Record not found: ${id}`, 404);

  return ok(record);
}

export async function PATCH(request: Request, context: { params: Params }) {
  const { module, resource, id } = await context.params;
  if (isBlockedModule(module)) {
    return fail("Authentication APIs are intentionally excluded from this backend layer.", 403);
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return fail("Request body must be valid JSON.", 400);
  }

  const record = updateRecord(module, resource, id, payload);
  if (!record) return fail(`Record not found: ${id}`, 404);

  return ok(record);
}

export async function DELETE(_request: Request, context: { params: Params }) {
  const { module, resource, id } = await context.params;
  if (isBlockedModule(module)) {
    return fail("Authentication APIs are intentionally excluded from this backend layer.", 403);
  }

  const record = deleteRecord(module, resource, id);
  if (!record) return fail(`Record not found: ${id}`, 404);

  return ok({ deleted: true, record });
}
