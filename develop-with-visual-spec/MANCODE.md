# mancode 适配（v1.1）

用 mancode 管任务、权限范围、版本和验收账本；用本包补齐“交互逻辑 → 真正生图 → 按图实现”的设计过程。不要另造一套工作流引擎。

## 1. 适用版本与边界

本适配基于 mancode 源码版本 0.6.10，固定提交 `77fb169f7b85a5070bd38d27254b10d0a945d44a`，于 2026-10-12 再次核对上游。本 fork 通过独立目录、README、AGENTS.md 非托管引用与 npm 打包清单接入；这不证明其他用户项目的本地版本、已安装 adapter、真实宿主或图像生成能力，首次使用仍须核验。

首次使用先通过当前宿主和公开只读入口核对版本、adapter、现有 TaskRef 与 policy。新任务采用本地确实支持的 `man` 模块交付入口；已有任务继续原 policy，不静默升级、降级或改用普通 Solo。版本不同先核对对应文档，不能照抄本文件里的新版命令。

本包是给助手遵守的流程约定。mancode 能约束其原有计划、scope 与账本协议，但本包没有新增 CLI 的 G1/G2 硬门禁，也不能自动证明图像已生成、用户已批准或界面与图片相符。

## 2. 只保留一份当前依据

- TaskRef、session、task state、review 与 verification 的权威仍归 mancode；通过公共 CLI 读写，不手改 `.mancode/` 下的治理状态。
- 新模块用一份绑定计划，例如 `docs/media-review.md`，从 [MODULE.template.md](MODULE.template.md) 填写；有绑定计划就原地适配，不另建根目录 PROJECT.md。已有项目总览只留链接，不复制状态。
- 本 fork 的绑定模块计划统一使用 `docs/<module>.md`，沿用 `docs/` 内既有命名约定。路径必须是带目录的仓库内相对 `.md` 路径，不能放在 `.git/`、`.mancode/`、`架构/` 或 `项目接口/` 下；文档索引仅按其支持的声明规则发现。
- `plan-baseline` 是要绑定和确认的目标、设计引用及实施边界。`delivery-record` 的正文会被运行时整体替换；把 G1/G2 原始批准依据、生成记录和手写补充放在该区之外。最终基线引用具体产物及修订，不能只写“见最新图片”。
- 本包独立保存。不要修改生成的 `man` skill 或 AGENTS.md / CLAUDE.md 中 mancode 的托管区；完整性检查可能把它们判为 stale。确需长期接入时，仅在用户授权后将下文引用片段放进非托管区域，且先核验实际路径。

## 3. 把设计关卡插在执行确认之前

1. **调研与 G1。** 沿 mancode 的调研、requirements draft / finalize 和计划流程，整理真实旅程、实体关系、范围及验收。blocking 问题保留在 draft；不能把未知假设 finalize。用户批准明确的逻辑修订后，在模块附录记录批准依据。
2. **Step 4 仍待最终确认。** 可以已有计划修订，但先不确认 `governed_execution`，也不发起受管 Solo 交接。不为了暂时等图片选择 `plan_only`：它表示止于规划，并会结束当前活动工作流指向；后续转执行存在计划/范围不变等恢复限制。用户真要只规划时才用它。
3. **G2 真正生图。** 按 [IMAGE-TO-UI.md](IMAGE-TO-UI.md) 调用真实图像生成工具、查看图片并请用户批准具体修订。图片能力缺失就保存材料包与阻塞，从当前 TaskRef 接续；HTML 原型或代码截图不能替代。G1 已批准不等于实施已授权。
4. **形成最终计划后再确认执行。** 把批准图片、精确文案、token、响应式规则、固定样例、验收方式与必要文件范围纳入最终基线。通过既有 plan revise 绑定，再取得最终执行计划的确认；支持时选择完整治理，或由用户选择保留原门禁的受管 Solo。批准 G2 不自动表示用户选定执行模式。若 G2 改变业务语义，只重开受影响 G1 并同步 requirements。
5. **实现与 G3。** 在已确认范围内按图实现，随后使用原 delivery / verification / review 流程收集证据和完成交付。不为本包再加一轮同内容总审，不另填“G3 已通过”。

以下仅是上述固定版本、支持模块交付的任务所用的两步命令示例；不是立即执行的指令。先用真实 TaskRef、session、client、文件路径及当前 revision 替换占位符。scope 必须覆盖实际授权的实现与计划文档；不要为消除报错扩大 scope。

```bash
mancode workflow plan <TASK_REF> revise --file docs/media-review.md --scope-file <SCOPE_FILE> --expected-revision <CURRENT_REVISION> --session <SESSION_ID> --client <CLIENT> --json
# G1/G2 与最终实施计划已获所需批准后，使用上一条成功结果返回的新 revision：
mancode workflow plan <TASK_REF> confirm --plan-decision governed_execution --expected-revision <NEW_REVISION> --session <SESSION_ID> --client <CLIENT> --json
```

会话恢复、计划修订和已有 `plan_only` 的转执行使用当前版本的官方协议；不得清理状态文件或新建 TaskRef 来绕过原确认/完成门禁。

## 4. 四类证据进入原账本

在原 requirements 的必需验收项中标明需要哪些证据，可以使用 `VIS-1`、`FLOW-1`、`DATA-1`、`ENG-1` 这样的验收 ID。这些只是自选 ID 前缀，不是 JSON 新字段，也不是 `surface` 枚举。

- VIS：实现截图与批准图在相同视口、样例和条件下的比较；保留具体差异。G2 的设计批准不能填成 VIS 实现验证通过。
- FLOW：实际走完批准旅程与相关失败路径；静态截图不够。
- DATA：实际身份、权限、读写和重新读取；mock 只能证明 mock。
- ENG：实际构建、类型检查和相关测试；不替代前三类。

按原 policy 声明验收方法与真正观察面，planning policy 3 的 `verificationSurfaces` 必须与录入的 surface 精确匹配；不要把上面四个缩写当 surface。用 `workflow delivery` 的 `verify` 运行自动检查、`confirm` 登记真实人工观察、`review` 记录总审，再通过 `sync` / `check` 处理回写和完成条件；旧 policy 或 execution policy V2 继续自己的协议。JSON schema 与完整命令以固定版本工作流文档为准。

人工观察要记录观察人、环境、结果和来源；助手自述不是独立认证。CLI 返回成功不代表测试通过，要检查实际测试退出码、证据状态和最终门禁。已有 evidence ID 可复用引用，源码/环境变动导致 stale 时按影响范围重新验证。最终还要满足原任务的文档回写、scope、提交和 completion / handoff 条件；本包不增加发布或提交权限。

### UI 必需验收与目标平台边界

- 所有涉及界面变化的交付必须在原 requirements/计划中包含必需的 VIS 与 FLOW 验收；小修复、沿用旧设计或用户明确免生效果图都不豁免真实 UI 检查。既有任务沿原 policy 和受支持的变更协议补齐，不私改状态、不新建任务绕过门禁。
- VIS 必须实际查看当前运行界面的截图，检查图标大小/基线、相邻控件、对齐、间距、文案和操作前后状态；FLOW 必须实际操作相关鼠标/键盘路径、展开关闭和焦点恢复。修改后复验受影响部分。构建、单测、DOM 尺寸、生成效果图或仅有截图路径均不能代替这些观察。
- 验收矩阵先声明目标设备、输入方式、最小可用窗口与常用/宽窗口。非移动 GUI 只检查支持的桌面窗口范围和范围内受影响断点，禁止机械追加手机/平板、320/375 CSS 像素或触屏矩阵。保留已明确约定的无障碍与放大验收，按实际桌面 DPI/缩放检查，不把它偷偷变成移动布局要求；窗口范围未知时先查产品约束，必要时询问。
- 任何情况下禁止操作触发的 outline 外框，包括点击、键盘/程序聚焦、active/selected 与焦点恢复；不得用 box-shadow ring 或伪元素重造同样的外框。永久结构边框与图标线条不属此禁令。必须以内部标记、下划线或带非颜色提示的填充等非外框方式保留清晰键盘焦点，不得靠隐藏全部焦点反馈达标；在真实操作中同时验证两者。
- 截图失败、浏览器不可用、未查看像素或未完成操作均保持 unverified，必需 VIS/FLOW 未满足不得标记 UI 完成。记录版本、实际窗口/缩放、页面状态、截图来源、观察者、动作与结果；助手自检如实标为自检，不伪造用户或独立审阅确认。
- 将这些条件映射到当前 CLI 支持的 required 验收项与准确 surface，再由原 delivery/review/check 门禁检查证据覆盖。这是说明层约束，不是新增运行时像素审美检测器；本次文档修订不声称 CLI 能自动判断视觉质量或鉴别虚假人工确认，也不安装/升级 CLI。

## 5. 接续、变更与小修复

接续先读原 TaskRef 的当前计划、适用约束、检查点、账本和图片本身。人工设计附录记录设计决定，不缓存当前 session 或复制 task state。只有最终基线里的批准设计可作为实现依据。

变化按 [SPEC.md](SPEC.md) 只重开受影响的设计关卡；先按原 TaskRef 的状态与 policy 走官方重新对齐流程。尚未确认执行的计划可 revise / confirm；已确认或正在执行时不得直接改批准基线。新证据推翻已确认需求且符合官方 reframe 条件的 local 任务，须由用户明确选择 reframe，保留并归档原基线后再澄清、finalize、revise、confirm；shared/team 或不符合条件的任务沿其原支持协议处理。文件边界单独变化只在支持时使用 scope change。不得直接改状态或另建任务绕过门禁，也不能只更新图片链接。恢复既有批准行为/样式的小修复可复用 G1/G2，不重新生图：最小修复、相关回归、必要截图即可。已有治理任务/受管 Solo 的账本门禁仍有效；普通 Solo 的小修复也不因此必须创建正式任务。

## 6. 可选的非托管规则与索引

本 fork 的独立目录位于项目根目录的 `develop-with-visual-spec/`，AGENTS.md 非托管区域已提供引用。复制到其他项目时先调整并核验路径，只放在非托管规则区域；不复制 session、revision 或当前任务状态。`mancode init` 不会自动分发本目录，npm 打包包含文件不等于宿主已安装技能。

```markdown
涉及 UI 的开发同时遵循 ./develop-with-visual-spec/SPEC.md 与 ./develop-with-visual-spec/MANCODE.md。
mancode 的 TaskRef、绑定模块计划和原 policy 保持唯一权威，不另建 PROJECT.md 状态。
按 ./develop-with-visual-spec/MANCODE.md 在最终执行确认前完成交互逻辑与真实图像生成的批准。
恢复已批准规格的小修复沿原快速路径；实现验收仍使用原任务账本。
```

若项目已采用 mancode 的文档索引，可把长期 UI 约束合并到现有 `docs/` 契约文档，按官方 `context-document` / section schema 声明真实模块、路径及至少一个 `global: true` 全局章节。不要仅凭文件存在就声称会自动读取，不把本包任意路径误当默认索引目录。此项可选，不需要为使用本包新建第二套契约；精确语法见下列项目上下文文档。`design-policy.json` 只接受规定枚举，不能塞入 G1/G2、自定义提示词或门禁字段。

## 固定版本依据

- [版本声明](https://github.com/whitelonng/mancode/blob/77fb169f7b85a5070bd38d27254b10d0a945d44a/package.json)
- [工作流、Step 4、模块交付、验证与接续](https://github.com/whitelonng/mancode/blob/77fb169f7b85a5070bd38d27254b10d0a945d44a/docs/workflows.md)
- [计划 marker、路径与交付区替换的实际解析器](https://github.com/whitelonng/mancode/blob/77fb169f7b85a5070bd38d27254b10d0a945d44a/src/context/man-delivery-plan.ts)
- [宿主入口、托管区与完整性检查](https://github.com/whitelonng/mancode/blob/77fb169f7b85a5070bd38d27254b10d0a945d44a/docs/platform-adapters.md)
- [设计策略、文档索引与声明 schema](https://github.com/whitelonng/mancode/blob/77fb169f7b85a5070bd38d27254b10d0a945d44a/docs/project-intelligence.md)

- [计划修订允许的任务状态](https://github.com/whitelonng/mancode/blob/77fb169f7b85a5070bd38d27254b10d0a945d44a/src/context/plan-revision.ts#L411-L432)
