# Fix EmailJS Template - Show Name and Email

## Problem
You're only receiving the message, but not the sender's name and email.

## Solution: Update Your EmailJS Template

### Step 1: Go to EmailJS Dashboard
1. Visit https://dashboard.emailjs.com/
2. Log in to your account

### Step 2: Edit Your Email Template
1. Click on **Email Templates** in the left sidebar
2. Click on your contact form template to edit it

### Step 3: Update the Template Content

**Subject Line:**
```
New Contact from Portfolio: {{from_name}}
```

**Email Content (copy this exactly):**
```
You have a new message from your portfolio contact form.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Message:
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: {{from_name}}
Email: {{from_email}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This message was sent from your portfolio contact form.
You can reply directly to: {{from_email}}
```

### Step 4: Configure Template Settings

**To Email:** `hardikshreyas8@gmail.com`

**Reply To:** `{{from_email}}` (This allows you to reply directly to the sender)

### Step 5: Save the Template
1. Click **Save** button
2. The template will be updated immediately

### Step 6: Test
1. Go back to your portfolio
2. Submit a test message through the contact form
3. Check your email - you should now see:
   - Sender's name
   - Sender's email
   - The message

## Important Notes

✅ **Variable Names Must Match Exactly:**
- `{{from_name}}` - not `{{name}}` or `{{sender_name}}`
- `{{from_email}}` - not `{{email}}` or `{{sender_email}}`
- `{{message}}` - not `{{msg}}` or `{{content}}`

✅ **Use Double Curly Braces:**
- Correct: `{{from_name}}`
- Wrong: `{from_name}` or `[from_name]`

✅ **Case Sensitive:**
- `{{from_name}}` is different from `{{From_Name}}`
- Use lowercase as shown

## Alternative Template Format (More Professional)

If you want a more professional-looking email:

```
Subject: New Portfolio Contact: {{from_name}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name:    {{from_name}}
Email:   {{from_email}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This message was sent from your portfolio website.
Reply to: {{from_email}}
```

## Still Not Working?

1. **Check Variable Names:**
   - Make sure you're using exactly: `{{from_name}}`, `{{from_email}}`, `{{message}}`
   - No spaces inside the braces: `{{ from_name }}` is wrong

2. **Test with a Simple Template First:**
   ```
   Name: {{from_name}}
   Email: {{from_email}}
   Message: {{message}}
   ```

3. **Check EmailJS Logs:**
   - Go to EmailJS Dashboard → **Logs**
   - See if the email was sent successfully
   - Check if variables are being passed

4. **Verify Template ID:**
   - Make sure you're using the correct Template ID in your `.env.local`
   - The Template ID should match the template you just edited

