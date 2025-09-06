// eslint.config.js
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  {
    // هذا هو الجزء الجديد: أخبر ESLint بما يجب تجاهله
    ignores: [
      'dist/', // تجاهل مجلد dist بالكامل
      'eslint.config.js', // تجاهل ملف الإعدادات نفسه من التدقيق
      'node_modules/', // تجاهل مجلد node_modules
    ],
  },
  // ابدأ بالإعدادات الموصى بها لـ TypeScript
  ...tseslint.configs.recommended,

  // أضف إعدادات Prettier لإلغاء القواعد التي تتعارض معه
  prettierConfig,
);
