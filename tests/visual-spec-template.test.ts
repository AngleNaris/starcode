import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  assertManPlanPath,
  compileManDeliveryPlan,
  parseManPlanDocument,
  replaceManDeliveryRecord,
} from '../src/context/man-delivery-plan.js';

describe('visual specification module template', () => {
  it('binds a docs plan and preserves design approvals when the runtime replaces delivery evidence', () => {
    const template = readFileSync(
      new URL(
        '../develop-with-visual-spec/MODULE.template.md',
        import.meta.url,
      ),
      'utf8',
    );
    const source = {
      version: 1 as const,
      path: 'docs/media-review.md',
      baseHead: null,
    };
    assertManPlanPath(source.path);
    const original = parseManPlanDocument(template);
    const appendix = template.slice(original.recordEnd);
    const compiled = compileManDeliveryPlan(source, template);
    const updated = replaceManDeliveryRecord(
      template,
      'FLOW-1: pending verification.',
    );
    const parsed = parseManPlanDocument(updated);

    expect(parsed.record).toBe('FLOW-1: pending verification.');
    expect(parsed.baseline).toBe(original.baseline);
    expect(updated.slice(parsed.recordEnd)).toBe(appendix);
    expect(compileManDeliveryPlan(source, updated)).toBe(compiled);
    expect(appendix).toContain('G1 批准／G2 生成／G2 批准／设计变更');
    expect(original.record).not.toContain('批准人');
  });
});
