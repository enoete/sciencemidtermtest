# 🎯 Science Quiz - Complete Deployment Package

## 📦 What's Included:

```
science-quiz-complete/
├── index.html              # The quiz (password: ilovemydaddy!!)
├── netlify.toml           # Netlify configuration
├── package.json           # Dependencies (node-fetch)
└── functions/
    └── grade-science.js   # AI grading serverless function
```

---

## 🚀 Deployment Options:

### **Option 1: Deploy to EXISTING Netlify Site (RECOMMENDED)**

If you already have the writing tool deployed on Netlify, you can add this quiz to the SAME site!

**Steps:**
1. Download this entire `science-quiz-complete` folder
2. In your existing Netlify project folder, do ONE of these:
   
   **A) Add quiz as a separate page:**
   - Copy `index.html` and rename it to `science-quiz.html`
   - Copy `functions/grade-science.js` to your existing `functions/` folder
   - Deploy update
   - Access at: `your-site.netlify.app/science-quiz.html`

   **B) Replace main page with quiz:**
   - Replace your current `index.html` with this `index.html`
   - Copy `functions/grade-science.js` to your existing `functions/` folder
   - Deploy update
   - Access at: `your-site.netlify.app`

**✅ ADVANTAGE:** Uses the same OpenAI API key you already configured! No extra setup needed!

---

### **Option 2: Deploy as NEW Netlify Site**

Create a completely separate site for the quiz.

**Steps:**

1. **Upload to Netlify:**
   - Go to https://app.netlify.com
   - Click "Add new site" → "Deploy manually"
   - Drag the entire `science-quiz-complete` folder
   - Drop it in the upload area
   - Netlify will automatically detect the function!

2. **Configure Environment Variable:**
   - Go to Site settings → Environment variables
   - Click "Add a variable"
   - Key: `OPENAI_API_KEY`
   - Click "Save"
   - **IMPORTANT:** Go to "Deploys" and click "Trigger deploy" → "Clear cache and deploy"

3. **Verify Function is Running:**
   - Go to "Functions" tab in Netlify dashboard
   - You should see `grade-science` listed
   - Status should be "Active" or "Ready"

4. **Test the Quiz:**
   - Open your site URL
   - Enter password: `ilovemydaddy!!`
   - Complete the quiz
   - Submit and verify AI grading works

---

## 🔍 How to Verify Everything Works:

### ✅ Check 1: Password Screen
- You should see a password input screen first
- Password: `ilovemydaddy!!` (exactly, with two exclamation marks)

### ✅ Check 2: Quiz Loads
- After password, you should see 56 questions
- Questions are organized by category (Circulatory, Digestive, etc.)
- Mix of multiple choice and open-ended questions

### ✅ Check 3: Function is Active
- In Netlify dashboard → Functions tab
- `grade-science` should show as "Active"
- If it says "Failed", check the function logs

### ✅ Check 4: AI Grading Works
- Answer all questions (you can put quick test answers)
- Click "Submit Quiz"
- You should see a loading spinner
- After 10-20 seconds, results should appear
- Open-ended questions should have detailed AI feedback

---

## 🆘 Troubleshooting:

### "Function not found" error:
- **Cause:** Function isn't in the right location
- **Fix:** Make sure `grade-science.js` is in `functions/` folder
- **Fix:** Redeploy the site

### "API key not configured" error:
- **Cause:** Environment variable not set
- **Fix:** Add `OPENAI_API_KEY` in Site Settings → Environment variables
- **Fix:** After adding, do "Clear cache and deploy"

### Quiz loads but grading fails:
- **Cause:** API key might be incorrect or expired
- **Fix:** Double-check the API key value
- **Fix:** Check function logs in Netlify for error details

### "Error grading your quiz" message:
- **Cause:** Network issue or API rate limit
- **Fix:** Wait a few seconds and try again
- **Fix:** Check function logs in Netlify dashboard

### Password not working:
- **Cause:** Typing error
- **Fix:** Make sure you type exactly: `ilovemydaddy!!` (lowercase, two exclamation marks)

---

## 💰 Cost Information:

### Netlify:
- **Free tier includes:**
  - 125,000 function invocations/month
  - 100 GB bandwidth
  - **This is MORE than enough for Adiaha's practice!**

### OpenAI API:
- Each quiz completion: ~$0.10 - $0.20
- 10 practice quizzes: ~$1 - $2
- Very affordable!

---

## 📊 Quiz Details:

### 56 Total Questions:
- **40 Multiple Choice** (auto-graded, 1 point each)
- **16 Open-Ended** (AI-graded, 2 points each)
- **Total: 72 possible points**

### Coverage:
- ✅ Circulatory System (8 questions)
- ✅ Digestive System (9 questions)
- ✅ Respiratory System (8 questions)
- ✅ Nervous System (7 questions)
- ✅ Musculoskeletal System (8 questions)
- ✅ States of Matter (8 questions)
- ✅ Thermal Energy (6 questions)
- ✅ Physical Properties (4 questions)
- ✅ Recycling & Water Cycle (6 questions)

### AI Grading Features:
- Detailed, personalized feedback
- Scores 0, 1, or 2 points per question
- Encourages complete answers
- Friendly, age-appropriate language
- Points out what was good AND what to improve

---

## 🎨 Customization:

### Change Password:
Edit `index.html`, line ~338:
```javascript
const correctPassword = "ilovemydaddy!!";  // Change this
```

### Add More Questions:
Edit `index.html`, find the `quizQuestions` array (~line 360) and add new questions following the same format.

---

## 📝 File Structure Explained:

- **index.html** - The main quiz interface
- **netlify.toml** - Tells Netlify where to find functions
- **package.json** - Lists dependencies (node-fetch for API calls)
- **functions/grade-science.js** - The AI grading logic

**All files must stay in this structure for Netlify to work properly!**

---

## ✅ Quick Checklist:

- [ ] Folder structure is correct (functions/ subfolder exists)
- [ ] Uploaded entire folder to Netlify
- [ ] Environment variable `OPENAI_API_KEY` is set
- [ ] Function shows as "Active" in Netlify dashboard
- [ ] Password works (`ilovemydaddy!!`)
- [ ] Quiz loads all 56 questions
- [ ] Test submission works and shows AI feedback

---

## 🎉 You're All Set!

Adiaha now has a comprehensive, AI-powered quiz to prepare for her science exam!

**Good luck on the test! 🌟**
