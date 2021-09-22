import { RuleStateInterface } from 'src/app/admin/rule/types/ruleState.interface';
import { AuthStateInterface } from 'src/app/auth/types/authState.interface'

export interface AppStateInterface {
  auth: AuthStateInterface
  rule: RuleStateInterface
}
