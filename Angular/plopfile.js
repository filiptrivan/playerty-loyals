module.exports = function (plop) {
    plop.setHelper('toKebab', function (text) {
        return text
          .replace(/([a-z])([A-Z])/g, '$1-$2')
          .replace(/\s+/g, '-')
          .toLowerCase();
    });

    plop.setHelper('firstCharToLower', function (text) {
        return text.charAt(0).toLowerCase() + text.slice(1);
    });

    plop.setGenerator('generate-form-component', {
      description: 'Generate form component',
      prompts: [
        {
          type: 'input',
          name: 'filename',
          message: 'Write name of the entity: ',
        }
      ],
      actions: [
        {
          type: 'add',
          path: 'plop/output/{{toKebab filename}}-details.component.html',
          templateFile: 'plop/spider-form-html-template.hbs',
        },
        {
          type: 'add',
          path: 'plop/output/{{toKebab filename}}-details.component.ts',
          templateFile: 'plop/spider-form-ts-template.hbs',
        },
      ],
    });
  };
  