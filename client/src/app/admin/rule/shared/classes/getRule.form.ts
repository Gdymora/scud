import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RuleField } from 'src/app/shared/types/rule.Interface';

export function getRuleForm(): FormGroup {
    return new FormGroup({
        [RuleField.Rule_name]: new FormControl(null, [Validators.required]),
        [RuleField.Day]: new FormControl(null, [Validators.required]),
        [RuleField.Hour_the_second]: new FormControl(null, [Validators.required, Validators.min(1)]),
        [RuleField.Hour_the_first]: new FormControl(null, [Validators.required, Validators.min(1)]),
   
    });
}