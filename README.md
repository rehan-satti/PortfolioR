# RPortfolio

## Contact Form Setup

- Local preview: the contact form runs in-browser and does not require a backend server for testing.
- To view submission data: open browser DevTools (F12 or Ctrl+Shift+I), submit the form, and inspect the Console tab.
- For real email delivery, connect the form to a service like Formspree or Web3Forms. Add the service endpoint to the form's `action` attribute and use `method="POST"`.

Example:

```html
<form id="contactForm" action="https://formspree.io/f/your-form-id" method="POST" class="contact-form">
```

## Professional Skills Section

The skills section now uses a modern profile card layout with metrics and polished pill-style tags to emphasize professional proficiency.
