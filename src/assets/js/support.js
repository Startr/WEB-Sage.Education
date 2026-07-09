function showErrors(input, errors) {

  let formGroup = input.parentNode;

  while(formGroup && formGroup !== document) {

    if(formGroup.classList.contains('validate-js')) break;

    formGroup = formGroup.parentNode;

  }

  if(!formGroup || formGroup === document) return;

  formGroup.classList.remove('error', 'success');
  formGroup.querySelectorAll('span.error').forEach((el) => el.remove());

  if(errors?.length) {

    formGroup.classList.add('error');

    errors.forEach((error) => {

      const block = document.createElement('span');

      block.classList.add('error');
      block.innerText = error;

      input.insertAdjacentElement('afterend', block);

    });

  } else {

    formGroup.classList.add('success');

  }

}

function submitSupport() {

  const form = document.querySelector('form#new_ticket_form');

  if(!form) return;

  validate.validators.maxFileSize = () => {

    const attachments = document.querySelector('#ticket_file');

    if(!attachments) return null;

    const totalSize = [...attachments.files].reduce((sum, file) => sum + file.size / 1024 / 1024, 0);

    return totalSize > 20 ? 'Attachments must be 20MB or less.' : null;

  };

  const errors = validate(form, {
    'ticket[issue_type]': {
      presence: { message: 'Tell us what you need help with.' }
    },
    'ticket[details]': {
      presence: { message: 'Tell us what your question, comment, or issue is.' }
    },
    'ticket[email_address]': {
      presence: { message: 'We need a working email address to reply back to you.' },
      email: { message: 'We need a working email address to reply back to you.' }
    },
    'ticket[files][]': {
      maxFileSize: {}
    }
  }, {
    fullMessages: false
  });

  form.querySelectorAll('input[name], textarea[name], select[name]').forEach((input) => {

    showErrors(input, errors?.[input.name]);

  });

  if(!errors) form.submit();

}

document.addEventListener('DOMContentLoaded', () => {

  const form = document.querySelector('form#new_ticket_form');

  if(!form) return;

  form.querySelectorAll('input, textarea, select').forEach((input) => {

    input.addEventListener('change', () => {

      const errors = validate(form, {}, { fullMessages: false }) || {};

      showErrors(input, errors[input.name]);

    });

  });

});
