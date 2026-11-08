# mancode 适配（v1.2）

用 mancode 管任务、权限范围、版本和验收账本；用本包补齐“明确交互逻辑 → 确认视觉依据与变更 → 实现和验证”的设计过程。G2 可沿用既有体系，不强制每次生图。不要另造一套工作流引擎。

## 1. 适用版本与边界

本适配基于 mancode 源码版本 0.6.10，固定提交 `77fb169f7b85a5070bd38d27254b10d0a945d44a`，于 2026-10-12 再次核对上游。本 fork 通过独立目录、README、AGENTS.md 非托管引用与 npm 打包清单接入；这不证明其他用户项目的本地版本、已安装 adapter、真实宿主或图像生成能力，首次使用仍须核验。

已有或明确采用 mancode 治理的任务，先通过当前宿主和公开只读入口核对版本、adapter、TaskRef 与 policy。正式采用 `man` 的新任务使用本地确实支持的模块交付入口；已有任务继续原 policy，不静默升级、降级或改用普通 Solo。没有活动/指定 TaskRef 且未选择治理模式的普通工作继续默认 Solo，不因本包创建正式任务、session 或账本。版本不同先核对对应文档，不能照抄本文件里的新版命令。

本包是给助手遵守的流程约定。mancode 能约束其原有计划、scope 与账本协议，但本包没有新增 CLI 的 G1/G2 硬门禁，也不能自动判断路由、证明图片已生成、用户已批准或视觉质量合格。inherit/explore 是文档中的路由说明，不是新增 JSON 枚举。

## 2. 只保留一份当前依据

- TaskRef、session、task state、review 与 verification 的权威仍归 mancode；通过公共 CLI 读写，不手改 `.mancode/` 下的治理状态。
- 新模块用一份绑定计划，例如 `docs/media-review.md`，从 [MODULE.template.md](MODULE.template.md) 填写；有绑定计划就原地适配，不另建根目录 PROJECT.md。已有项目总览只留链接，不复制状态。
- 本 fork 的绑定模块计划统一使用 `docs/<module>.md`，沿用 `docs/` 内既有命名约定。路径必须是带目录的仓库内相对 `.md` 路径，不能放在 `.git/`、`.mancode/`、`架构/` 或 `项目接口/` 下；文档索引仅按其支持的声明规则发现。
- `plan-baseline` 是要绑定和确认的目标、设计引用及实施边界。`delivery-record` 的正文会被运行时整体替换；把 G1/G2 的路由、依据来源、真实批准记录、实际生成记录和手写补充放在该区之外。最终基线引用具体产物/组件/页面及版本，不能只写“见最新图片”或“沿用现有风格”。
- 本包独立保存。不要修改生成的 `man` skill 或 AGENTS.md / CLAUDE.md 中 mancode 的托管区；完整性检查可能把它们判为 stale。确需长期接入时，仅在用户授权后将下文引用片段放进非托管区域，且先核验实际路径。

## 3. 在原执行确认中纳入视觉依据

本节适用于 mancode 的受管模块任务；普通 Solo 继续其原有授权与比例适当的验证，不额外创建 Step 4 或正式计划。

1. **调研与 G1。** 沿 mancode 的调研、requirements draft / finalize 和计划流程，整理真实旅程、实体关系、范围及验收。blocking 问题保留在 draft；不能把未知假设 finalize。复用有效需求与实际授权，不重复询问已决定的逻辑；必要批准在模块附录引用真实来源。
2. **Step 4 仍待最终确认。** 可以已有计划修订，但在所需依据和最终计划齐备前不确认 `governed_execution`，也不发起受管 Solo 交接。不为了暂时等待设计决定而选择 `plan_only`：它表示止于规划，并会结束当前活动工作流指向；后续转执行存在计划/范围不变等恢复限制。用户真要只规划时才用它。
3. **G2 视觉依据与变更确认。** 按 [IMAGE-TO-UI.md](IMAGE-TO-UI.md) 选择路由。inherit 检查现有 token、组件、采用中的页面和实际截图，覆盖同体系接续、新页面/布局与局部调整，无需重新生图或补造历史图片批准。explore 仅用于新视觉体系、整体重做或明确的新方向请求，选择适合的生图或真实原型；只有选择生图时才要求真实调用、查看输出和据实记录。单项资产生成不改变 UI 路由。现有依据不豁免缺陷，也不覆盖用户最新要求。
4. **形成最终计划后再确认执行。** 把所选路由、有效视觉依据、本次变更、精确文案/token、布局规则、固定样例、验收方法与文件范围纳入最终基线。通过既有 plan revise 绑定，再取得最终执行计划的确认；支持时选择完整治理，或由用户选择保留原门禁的受管 Solo。G2 依据充分不自动表示用户选定执行模式。真正改变业务语义时只重开受影响 G1 并同步 requirements。
5. **实现与 G3。** 在已确认范围内沿视觉依据实现，使用原 delivery / verification / review 流程收集证据与交付。已经授权且仍在计划范围内的局部工作直接推进，不加图片审批；真正改变批准计划时仍走原重新对齐协议。不另填第二份“G3 已通过”。

以下仅是上述固定版本、支持模块交付的任务所用的两步命令示例；不是立即执行的指令。先用真实 TaskRef、session、client、文件路径及当前 revision 替换占位符。scope 必须覆盖实际授权的实现与计划文档；不要为消除报错扩大 scope。

```bash
mancode workflow plan <TASK_REF> revise --file docs/media-review.md --scope-file <SCOPE_FILE> --expected-revision <CURRENT_REVISION> --session <SESSION_ID> --client <CLIENT> --json
# G1/G2 与最终实施计划已获所需批准后，使用上一条成功结果返回的新 revision：
mancode workflow plan <TASK_REF> confirm --plan-decision governed_execution --expected-revision <NEW_REVISION> --session <SESSION_ID> --client <CLIENT> --json
```

会话恢复、计划修订和已有 `plan_only` 的转执行使用当前版本的官方协议；不得清理状态文件或新建 TaskRef 来绕过原确认/完成门禁。

## 4. 四类证据进入原账本

在原 requirements 的必需验收项中标明需要哪些证据，可以使用 `VIS-1`、`FLOW-1`、`DATA-1`、`ENG-1` 这样的验收 ID。这些只是自选 ID 前缀，不是 JSON 新字段，也不是 `surface` 枚举。

- VIS：实际查看实现截图，与 inherit 的现有体系及本次变更要求，或 explore 的所选产物在可比条件下核对，保留具体差异。G2 依据确认不能填成 VIS 实现验证通过。
- FLOW：实际走完批准旅程与相关失败路径；静态截图不够。
- DATA：实际身份、权限、读写和重新读取；mock 只能证明 mock。
- ENG：实际构建、类型检查和相关测试；不替代前三类。

按原 policy 声明验收方法与真正观察面，planning policy 3 的 `verificationSurfaces` 必须与录入的 surface 精确匹配；不要把上面四个缩写当 surface。用 `workflow delivery` 的 `verify` 运行自动检查、`confirm` 登记真实人工观察、`review` 记录总审，再通过 `sync` / `check` 处理回写和完成条件；旧 policy 或 execution policy V2 继续自己的协议。JSON schema 与完整命令以固定版本工作流文档为准。

人工观察要记录观察人、环境、结果和来源；助手自述不是独立认证。CLI 返回成功不代表测试通过，要检查实际测试退出码、证据状态和最终门禁。已有 evidence ID 可复用引用，源码/环境变动导致 stale 时按影响范围重新验证。最终还要满足原任务的文档回写、scope、提交和 completion / handoff 条件；本包不增加发布或提交权限。

### UI 必需验收与目标平台边界

- 涉及界面变化的受管交付在原 requirements/计划中保留必需的 VIS 与 FLOW 验收；inherit、explore 和局部修复均须检查真实 UI。既有任务沿原 policy 和受支持的变更协议补齐，不私改状态、不新建任务绕过门禁。普通 Solo 按其原方式记录实际检查，不强制创建正式 requirements。
- VIS 必须实际查看当前运行界面的截图，检查图标大小/基线、相邻控件、对齐、间距、文案和操作前后状态；FLOW 必须实际操作相关鼠标/键盘路径、展开关闭和焦点恢复。修改后复验受影响部分。构建、单测、DOM 尺寸、生成效果图或仅有截图路径均不能代替这些观察。
- 验收矩阵先声明目标设备、输入方式、最小可用窗口与常用/宽窗口。非移动 GUI 只检查支持的桌面窗口范围和范围内受影响断点，禁止机械追加手机/平板、320/375 CSS 像素或触屏矩阵。保留已明确约定的无障碍与放大验收，按实际桌面 DPI/缩放检查，不把它偷偷变成移动布局要求；窗口范围未知时先查产品约束，必要时询问。
- 视觉取舍默认以美学与当前体系为先；没有明确标准承诺时，无障碍数值是末位诊断，不自动触发 G2 重开、主题改色或新增外框/阴影环/装饰色条/下划线。语义、原生键盘行为、标签关联与合适的既有焦点反馈照常保留；不以隐藏全部焦点反馈消除报告。真正影响实际辨识或操作的问题按具体场景修正，明确承诺的标准继续验收。
- 截图失败、浏览器不可用、未查看像素或未完成操作均保持 unverified，必需 VIS/FLOW 未满足不得标记 UI 完成。记录版本、实际窗口/缩放、页面状态、截图来源、观察者、动作与结果；助手自检如实标为自检，不伪造用户或独立审阅确认。
- 将这些条件映射到当前 CLI 支持的 required 验收项与准确 surface，再由原 delivery/review/check 门禁检查证据覆盖。这是说明层约束，不是新增运行时像素审美检测器；本次文档修订不声称 CLI 能自动判断视觉质量或鉴别虚假人工确认，也不安装/升级 CLI。

## 5. 接续、变更与小修复

接续先读原 TaskRef 的当前计划、约束、检查点、账本，以及所选视觉路由和具体依据。依据可能是现有 token/组件/页面、实际截图，也可能是选定的探索产物；引用图片须实际查看。人工附录不缓存 session 或复制 task state。受管实现依已确认计划及其引用，不能凭旧字段“G2 待生成”自动生成新界面，也不能把采用中的代码伪称历史图片批准。

先核对当前用户要求，再按 [SPEC.md](SPEC.md) 处理受影响决定。已授权且仍在原计划范围内的页面扩展、局部间距/字号调整和恢复性修复都可沿 inherit 继续，补充实际截图与相关回归，不新增图片批准。继承不意味着保留 bug，也不允许忽略用户新的明确要求。单项资产生成不重置整体视觉体系。

确实改变批准基线时，先按原 TaskRef 状态与 policy 走官方重新对齐流程。尚未确认执行的计划可 revise / confirm；已确认或正在执行时不得直接改批准基线。新证据推翻已确认需求且符合官方 reframe 条件的 local 任务，须由用户明确选择 reframe，保留并归档原基线后再澄清、finalize、revise、confirm；shared/team 或不符合条件的任务沿其原支持协议处理。文件边界单独变化只在支持时使用 scope change。不得直接改状态或另建任务绕过门禁，也不能只更新设计引用。旧流程文字需迁移时据实记录理由，保留批准历史与原治理协议。

只有已选择的生图或资产生成工作依赖图像工具；能力缺失仅阻塞相关部分，继续其他已授权工作。真实 UI 截图或操作未完成时相应验证仍未通过。已有治理任务/受管 Solo 的账本门禁仍有效；普通 Solo 不因此创建正式任务。

## 6. 可选的非托管规则与索引

本 fork 的独立目录位于项目根目录的 `develop-with-visual-spec/`，AGENTS.md 非托管区域已提供引用。复制到其他项目时先调整并核验路径，只放在非托管规则区域；不复制 session、revision 或当前任务状态。`mancode init` 不会自动分发本目录，npm 打包包含文件不等于宿主已安装技能。

```markdown
涉及 UI 的开发同时遵循 ./develop-with-visual-spec/SPEC.md 与 ./develop-with-visual-spec/MANCODE.md。
mancode 的 TaskRef、绑定模块计划和原 policy 保持唯一权威，不另建 PROJECT.md 状态。
G2 确认视觉依据与本次变更：已有体系默认 inherit，接续、新页面/布局和局部修改无需重新生图。
仅新视觉体系、整体重做或明确新方向请求走 explore，按需选择真实生图或原型；资产生成不重置 UI。
受管任务在最终执行确认前将有效依据纳入计划；已授权范围内工作直接继续，真正改变基线沿原重新对齐协议。
恢复时读取路由和实际依据，不把 G2 待办直接当成生图指令；实现截图与交互验收仍使用原任务账本。
```

若项目已采用 mancode 的文档索引，可把长期 UI 约束合并到现有 `docs/` 契约文档，按官方 `context-document` / section schema 声明真实模块、路径及至少一个 `global: true` 全局章节。不要仅凭文件存在就声称会自动读取，不把本包任意路径误当默认索引目录。此项可选，不需要为使用本包新建第二套契约；精确语法见下列项目上下文文档。`design-policy.json` 只接受规定枚举，不能塞入 G1/G2、自定义提示词或门禁字段。

## 固定版本依据

- [版本声明](https://github.com/whitelonng/mancode/blob/77fb169f7b85a5070bd38d27254b10d0a945d44a/package.json)
- [工作流、Step 4、模块交付、验证与接续](https://github.com/whitelonng/mancode/blob/77fb169f7b85a5070bd38d27254b10d0a945d44a/docs/workflows.md)
- [计划 marker、路径与交付区替换的实际解析器](https://github.com/whitelonng/mancode/blob/77fb169f7b85a5070bd38d27254b10d0a945d44a/src/context/man-delivery-plan.ts)
- [宿主入口、托管区与完整性检查](https://github.com/whitelonng/mancode/blob/77fb169f7b85a5070bd38d27254b10d0a945d44a/docs/platform-adapters.md)
- [设计策略、文档索引与声明 schema](https://github.com/whitelonng/mancode/blob/77fb169f7b85a5070bd38d27254b10d0a945d44a/docs/project-intelligence.md)

- [计划修订允许的任务状态](https://github.com/whitelonng/mancode/blob/77fb169f7b85a5070bd38d27254b10d0a945d44a/src/context/plan-revision.ts#L411-L432)
