import { withInstall } from '../utils';
import _RuleDialog from './RuleDialog';

const RuleDialog = withInstall<typeof _RuleDialog>(_RuleDialog);

export default RuleDialog;
export { RuleDialog };
export type { DialogMessage, DialogMessageAlign } from './RuleDialog';