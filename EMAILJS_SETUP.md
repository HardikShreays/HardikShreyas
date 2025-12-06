# EmailJS Setup Instructions

This guide will help you set up EmailJS for the contact form in your portfolio.

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (free tier includes 200 emails/month)

## Step 2: Add an Email Service

1. Go to **Email Services** in your EmailJS dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Copy the **Service ID** (you'll need this later)

## Step 3: Create an Email Template

1. Go to **Email Templates** in your EmailJS dashboard
2. Click **Create New Template**
3. Use the following template structure:

**Template Name:** Contact Form

**Subject:** New Contact Form Message from {{from_name}}

**Content:**
```
From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Make sure to include these variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{message}}` - Message content
   - `{{to_email}}` - Your email (hardikshreyas8@gmail.com)

5. Set **To Email** to: `hardikshreyas8@gmail.com`
6. Copy the **Template ID** (you'll need this later)

## Step 4: Get Your Public Key

1. Go to **Account** > **General** in your EmailJS dashboard
2. Find your **Public Key** in the API Keys section
3. Copy the **Public Key**

## Step 5: Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and fill in your EmailJS credentials:
   ```
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_actual_public_key
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_actual_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_actual_template_id
   ```

3. Replace the placeholder values with your actual keys from EmailJS

## Step 6: Test the Contact Form

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the contact section on your portfolio
3. Fill out and submit the contact form
4. Check your email (hardikshreyas8@gmail.com) for the message

## Troubleshooting

- **"EmailJS configuration is missing"**: Make sure all three environment variables are set in `.env.local`
- **"Failed to send message"**: 
  - Check that your EmailJS service is properly configured
  - Verify your template variables match the code
  - Check the browser console for detailed error messages
- **Not receiving emails**: 
  - Check your spam folder
  - Verify your email service is connected in EmailJS
  - Check EmailJS dashboard for delivery status

## Security Notes

- Never commit `.env.local` to version control (it's already in `.gitignore`)
- The public key is safe to expose in client-side code
- For production, add these environment variables to your hosting platform (Vercel, Netlify, etc.)


