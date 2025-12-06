# EmailJS 400 Bad Request - Troubleshooting Guide

## Common Causes of 400 Bad Request Error

### 1. **Service ID and Template ID are the same** ⚠️
**Your current issue:** Both IDs are `ByBfwFmCSpX6dFOX7xPhn`

**Fix:**
- Service ID should come from **Email Services** section
- Template ID should come from **Email Templates** section
- They MUST be different values!

### 2. **Template Variables Don't Match**

Your code sends these variables:
- `from_name`
- `from_email`
- `message`
- `reply_to` (optional)

**Your EmailJS template MUST include these exact variable names:**
```
{{from_name}}
{{from_email}}
{{message}}
```

### 3. **How to Get the Correct IDs**

#### Getting Service ID:
1. Go to EmailJS Dashboard → **Email Services**
2. Click on your service (Gmail, Outlook, etc.)
3. Copy the **Service ID** (starts with `service_` or similar)
4. Example: `service_gmail123` or `service_abcxyz`

#### Getting Template ID:
1. Go to EmailJS Dashboard → **Email Templates**
2. Click on your template
3. Copy the **Template ID** (starts with `template_` or similar)
4. Example: `template_contact456` or `template_xyz789`

### 4. **Correct .env.local Format**

```env
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="LIDekPNVUUUbCYwbo"
NEXT_PUBLIC_EMAILJS_SERVICE_ID="service_xxxxx"  # From Email Services
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="template_xxxxx"  # From Email Templates
```

**Important:** Service ID and Template ID must be DIFFERENT!

### 5. **EmailJS Template Setup**

Your template should look like this:

**Subject:**
```
New Contact from Portfolio: {{from_name}}
```

**Content:**
```
You have a new message from your portfolio contact form.

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
Sent from your portfolio website.
Reply to: {{from_email}}
```

**To Email:** `hardikshreyas8@gmail.com`

### 6. **Check Browser Console**

Open browser DevTools (F12) → Console tab to see detailed error messages.

The improved error handling will now show:
- Specific EmailJS error messages
- Configuration validation errors
- HTTP status codes

### 7. **Quick Fix Steps**

1. **Verify your EmailJS Dashboard:**
   - Go to https://dashboard.emailjs.com/
   - Check **Email Services** → Copy the correct Service ID
   - Check **Email Templates** → Copy the correct Template ID
   - Make sure they're DIFFERENT!

2. **Update .env.local:**
   ```env
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="LIDekPNVUUUbCYwbo"
   NEXT_PUBLIC_EMAILJS_SERVICE_ID="your_actual_service_id_here"
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="your_actual_template_id_here"
   ```

3. **Restart dev server:**
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   ```

4. **Test again** - The error message will now be more specific!

### 8. **Still Getting 400 Error?**

Check the browser Network tab:
1. Open DevTools (F12)
2. Go to **Network** tab
3. Submit the form
4. Click on the failed request to `api.emailjs.com`
5. Check the **Response** tab for detailed error message

Common EmailJS error messages:
- `"Service not found"` → Wrong Service ID
- `"Template not found"` → Wrong Template ID
- `"Invalid template variables"` → Template variables don't match
- `"Rate limit exceeded"` → Too many requests (free tier: 200/month)

