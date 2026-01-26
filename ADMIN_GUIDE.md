# Admin Guide: Adding Services and Portfolio Items (Our Work)

## ✅ Admin Features Already Enabled

Your RISE Advertising website already has full admin functionality to add, edit, and delete both **Services** and **Portfolio Items (Our Work)**. Here's how to use them:

---

## 🔐 Accessing the Admin Panel

1. **Login Page**: Navigate to `/admin/login`
2. **Use admin credentials** to log in
3. You'll be redirected to the **Admin Dashboard**

---

## 📋 Managing Services

### How to Add a New Service:

1. **Go to**: Admin Dashboard → **Services** (or navigate to `/admin/services`)

2. **Select a Category**: 
   - First, click on one of the service categories (A-M):
     - A. Signage & Neon & LED Signs
     - B. Large Format & UV Printing
     - C. Promotional Items & Gift & Giveaways
     - D. Corporate Branding & Identity
     - E. Vehicle Graphics & Branding
     - F. Digital Printing & Stationery
     - G. Creative Graphic Design
     - H. Exhibition & Event Branding
     - I. Indoor & Office Branding
     - J. Outdoor Advertising Solutions
     - K. Apparel & Textile Printing
     - L. Custom fabrication & 3D lettering
     - M. Maintenance & Installation Services

3. **Click "Add New to [Category]"** button (appears when a category is selected)

4. **Fill in the Service Form**:
   - **Official Title*** (required): e.g., "UV-Resistant Vinyl Print"
   - **System Slug**: auto-generated from title, or customize for SEO
   - **Catalog Description**: Short description for the service grid
   - **Deep Dive Content**: Detailed technical information
   - **Price Estimation**: e.g., "From ETB 10,000"
   - **Classification Tags**: Comma-separated tags
   - **Primary Display Category**: Select from dropdown
   - **Listing Status**: Toggle Published/Ghost mode
   - **High-Resolution Visual**: Upload image or paste URL

5. **Click "Securely Register Service"**

### Features:
- ✅ **Edit Services**: Click the edit icon on any service card
- ✅ **Delete Services**: Click the trash icon
- ✅ **Toggle Published Status**: Click "Draft Mode" / "Publish Live" button
- ✅ **Image Upload**: Upload from local files or paste external URL
- ✅ **Category Filtering**: View services by category
- ✅ **Auto-generated Slugs**: SEO-friendly URLs created automatically

---

## 🎨 Managing Portfolio Items (Our Work)

### How to Add a New Portfolio Item:

1. **Go to**: Admin Dashboard → **Portfolio** (or navigate to `/admin/portfolio`)

2. **Select a Category**:
   - Banners
   - Signage
   - Promotional
   - Branding
   - Events

3. **Click "Add New to [Category]"** button (appears when a category is selected)

4. **Fill in the Portfolio Form**:
   - **Project Title*** (required): e.g., "VIP Signage Lebu Mall"
   - **URL Slug**: auto-generated or customize
   - **Client Name**: The client's name (or leave empty for self-projects)
   - **Project Date**: When the project was completed
   - **Description**: Detailed project description
   - **Gallery Images**: Upload multiple images (supports multiple file upload)
   - **Category Selection**: Primary category for the work
   - **Other Tags**: Additional comma-separated tags
   - **Featured Work**: Toggle to mark as featured
   - **Published**: Toggle to publish or keep as draft

5. **Click "Finalize and Add Project"**

### Features:
- ✅ **Multiple Images**: Upload multiple project images to create a gallery
- ✅ **Edit Portfolio Items**: Click the edit icon on any work card
- ✅ **Delete Items**: Click the trash icon
- ✅ **Toggle Featured Status**: Click the star icon to feature/unfeature
- ✅ **Category Filtering**: View works by category
- ✅ **Live/Draft Status**: Shows whether item is published or in draft mode
- ✅ **Image Management**: Add/remove images from the gallery

---

## 🖼️ Image Upload Best Practices

### For Both Services and Portfolio:
- **Recommended Size**: At least 1200x800px for best quality
- **Max File Size**: 5MB per image (for portfolio)
- **Supported Formats**: JPG, PNG, WebP
- **Storage**: Images automatically uploaded to Supabase Storage
- **Alternative**: Can also paste external image URLs

---

## 📊 Admin Dashboard Navigation

The admin panel includes a sidebar with quick access to:
- **Dashboard**: Overview and stats
- **Services**: Manage service catalog (A-M categories)
- **Portfolio**: Manage work showcase (Banners, Signage, etc.)
- **Quotes**: View and manage quote requests from customers
- **Settings**: Manage admin account settings

---

## 🎯 Key Points

1. **Category Selection is Required**: You must select a category filter before adding new items
2. **Auto-save**: Changes are saved immediately to the database
3. **Image URLs**: Automatically generated and stored after upload
4. **SEO-Friendly Slugs**: Auto-generated from titles for better search engine optimization
5. **Published/Draft Control**: Control visibility on the public website

---

## 🔗 Direct Links

- **Admin Login**: `/admin/login`
- **Services Management**: `/admin/services`
- **Portfolio Management**: `/admin/portfolio`
- **Dashboard**: `/admin/dashboard`

---

## ✨ Everything is Ready!

Both the Services and Portfolio admin pages are **fully functional and ready to use**. No additional setup required - just log in and start managing your content!
