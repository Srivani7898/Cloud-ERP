import { fail, ok } from "@/lib/api/responses";
import { isBlockedModule, listResources } from "@/lib/api/erp-data";

export async function GET(_request: Request, context: { params: Promise<{ module: string }> }) {
  const { module } = await context.params;
  if (isBlockedModule(module)) {
    return fail("Authentication APIs are intentionally excluded from this backend layer.", 403);
  }

  const resources = listResources(module);
  if (!resources.length) {
    return fail(`Unknown module: ${module}`, 404);
  }

  return ok({ module, resources });
}
