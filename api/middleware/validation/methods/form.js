const error_messages = require('./messages');

const rules = require('./rules');

const keys = (obj) => Object.keys(obj);

//form_values is an object complying with fieldname:value format
//validation is an object with rules applied to each field under validation
function validate_form( form_values,form_validation ){
    return keys(form_values).reduce(
        ( res_error,field_name ) => {
            const field_validation = form_validation[field_name],
                field_value = form_values[field_name];
            res_error[field_name] = keys(field_validation).reduce(
                ( rule_error,rule_name ) => (
                    rules[rule_name]( field_value,field_validation[rule_name] )
                    ? [
                        ...rule_error,
                        error_messages[rule_name]( field_name,field_value,field_validation[rule_name] )
                    ]
                    : rule_error
                ),
                []
            );
            return res_error;
        },
        {}
    );
}

module.exports = validate_form;