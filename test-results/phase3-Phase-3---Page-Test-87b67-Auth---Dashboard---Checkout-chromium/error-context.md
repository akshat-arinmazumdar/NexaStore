# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: phase3.spec.ts >> Phase 3 - Page Tests >> Home -> Shop -> Product Detail -> Cart -> Auth -> Dashboard -> Checkout
- Location: phase3.spec.ts:57:7

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByRole('button', { name: /add to cart/i })
Expected: 10
Received: 12
Timeout:  60000ms

Call log:
  - Expect "toHaveCount" with timeout 60000ms
  - waiting for getByRole('button', { name: /add to cart/i })
    3 × locator resolved to 0 elements
      - unexpected value "0"
    60 × locator resolved to 12 elements
       - unexpected value "12"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - main [ref=e2]:
    - navigation [ref=e3]:
      - generic [ref=e4]:
        - link "NexaStore" [ref=e5] [cursor=pointer]:
          - /url: /
          - img [ref=e7]
          - generic [ref=e10]: NexaStore
        - generic [ref=e11]:
          - link "Home" [ref=e12] [cursor=pointer]:
            - /url: /
          - link "Shop" [ref=e13] [cursor=pointer]:
            - /url: /shop
          - link "Custom Project" [ref=e14] [cursor=pointer]:
            - /url: /custom-project
          - link "About" [ref=e15] [cursor=pointer]:
            - /url: /#about
        - generic [ref=e16]:
          - button [ref=e18] [cursor=pointer]:
            - img [ref=e19]
          - link "0" [ref=e22] [cursor=pointer]:
            - /url: /wishlist
            - img [ref=e23]
            - generic [ref=e25]: "0"
          - link "0" [ref=e26] [cursor=pointer]:
            - /url: /cart
            - img [ref=e27]
            - generic [ref=e31]: "0"
          - link "Login" [ref=e32] [cursor=pointer]:
            - /url: /login
    - generic [ref=e33]:
      - complementary [ref=e34]:
        - generic [ref=e35]:
          - generic [ref=e36]:
            - heading "Categories" [level=4] [ref=e37]
            - generic [ref=e38]:
              - button "All Categories" [ref=e39] [cursor=pointer]
              - button "AI Models" [ref=e40] [cursor=pointer]
              - button "Mobile Apps" [ref=e41] [cursor=pointer]
              - button "Websites" [ref=e42] [cursor=pointer]
              - button "SaaS Tools" [ref=e43] [cursor=pointer]
              - button "Bundles" [ref=e44] [cursor=pointer]
          - generic [ref=e45]:
            - heading "Price Range" [level=4] [ref=e46]
            - generic [ref=e47]:
              - generic [ref=e48]:
                - generic [ref=e49]:
                  - text: Min
                  - generic [ref=e50]:
                    - generic [ref=e51]: ₹
                    - spinbutton [ref=e52]: "0"
                - generic [ref=e54]:
                  - text: Max
                  - generic [ref=e55]:
                    - generic [ref=e56]: ₹
                    - spinbutton [ref=e57]: "1000"
              - generic [ref=e58]:
                - button "Under ₹100" [ref=e59] [cursor=pointer]
                - button "₹100 - ₹500" [ref=e60] [cursor=pointer]
          - generic [ref=e61]:
            - heading "Minimum Rating" [level=4] [ref=e62]
            - generic [ref=e63]:
              - button "5.0 & up" [ref=e64] [cursor=pointer]:
                - generic [ref=e65]:
                  - img [ref=e66]
                  - img [ref=e68]
                  - img [ref=e70]
                  - img [ref=e72]
                  - img [ref=e74]
                - generic [ref=e76]: 5.0 & up
              - button "4.0 & up" [ref=e77] [cursor=pointer]:
                - generic [ref=e78]:
                  - img [ref=e79]
                  - img [ref=e81]
                  - img [ref=e83]
                  - img [ref=e85]
                  - img [ref=e87]
                - generic [ref=e89]: 4.0 & up
              - button "3.0 & up" [ref=e90] [cursor=pointer]:
                - generic [ref=e91]:
                  - img [ref=e92]
                  - img [ref=e94]
                  - img [ref=e96]
                  - img [ref=e98]
                  - img [ref=e100]
                - generic [ref=e102]: 3.0 & up
              - button "2.0 & up" [ref=e103] [cursor=pointer]:
                - generic [ref=e104]:
                  - img [ref=e105]
                  - img [ref=e107]
                  - img [ref=e109]
                  - img [ref=e111]
                  - img [ref=e113]
                - generic [ref=e115]: 2.0 & up
              - button "1.0 & up" [ref=e116] [cursor=pointer]:
                - generic [ref=e117]:
                  - img [ref=e118]
                  - img [ref=e120]
                  - img [ref=e122]
                  - img [ref=e124]
                  - img [ref=e126]
                - generic [ref=e128]: 1.0 & up
          - generic [ref=e129]:
            - heading "Sort By" [level=4] [ref=e130]
            - combobox [ref=e131]:
              - option "Newest First" [selected]
              - option "Most Popular"
              - 'option "Price: Low to High"'
              - 'option "Price: High to Low"'
              - option "Best Rated"
          - button "Reset All Filters" [ref=e132] [cursor=pointer]
      - generic [ref=e133]:
        - generic [ref=e134]:
          - generic [ref=e135]:
            - heading "Shop All Products" [level=1] [ref=e136]
            - paragraph [ref=e137]: Showing 12 results of premium digital products
          - generic [ref=e138]:
            - img [ref=e139]
            - textbox "Search products..." [ref=e142]
        - generic [ref=e143]:
          - generic [ref=e144]:
            - generic [ref=e146]: SAAS TOOL
            - generic [ref=e147]:
              - button [ref=e148] [cursor=pointer]:
                - img [ref=e149]
              - button [ref=e151] [cursor=pointer]:
                - img [ref=e152]
            - link "Test Admin Product Quick View" [ref=e156] [cursor=pointer]:
              - /url: /shop/test-admin-product
              - img "Test Admin Product" [ref=e157]
              - generic [ref=e159]: Quick View
            - generic [ref=e160]:
              - generic [ref=e161]:
                - link "Test Admin Product" [ref=e162] [cursor=pointer]:
                  - /url: /shop/test-admin-product
                - generic [ref=e163]:
                  - img [ref=e164]
                  - generic [ref=e166]: "0"
              - paragraph [ref=e167]: Testing
              - generic [ref=e168]:
                - generic [ref=e171]: ₹99
                - button "Add to Cart" [ref=e172] [cursor=pointer]:
                  - img [ref=e173]
                  - text: Add to Cart
          - generic [ref=e177]:
            - generic [ref=e179]: SAAS TOOL
            - generic [ref=e180]:
              - button [ref=e181] [cursor=pointer]:
                - img [ref=e182]
              - button [ref=e184] [cursor=pointer]:
                - img [ref=e185]
            - link "Verification Product Quick View" [ref=e189] [cursor=pointer]:
              - /url: /shop/verification-product
              - img "Verification Product" [ref=e190]
              - generic [ref=e192]: Quick View
            - generic [ref=e193]:
              - generic [ref=e194]:
                - link "Verification Product" [ref=e195] [cursor=pointer]:
                  - /url: /shop/verification-product
                - generic [ref=e196]:
                  - img [ref=e197]
                  - generic [ref=e199]: "0"
              - paragraph [ref=e200]: This is a verification product for image upload test.
              - generic [ref=e201]:
                - generic [ref=e204]: ₹100
                - button "Add to Cart" [ref=e205] [cursor=pointer]:
                  - img [ref=e206]
                  - text: Add to Cart
          - generic [ref=e210]:
            - generic [ref=e212]: BUNDLE
            - generic [ref=e213]:
              - button [ref=e214] [cursor=pointer]:
                - img [ref=e215]
              - button [ref=e217] [cursor=pointer]:
                - img [ref=e218]
            - link "DevOps CI/CD Toolkit Quick View" [ref=e222] [cursor=pointer]:
              - /url: /shop/devops-cicd-toolkit
              - img "DevOps CI/CD Toolkit" [ref=e223]
              - generic [ref=e225]: Quick View
            - generic [ref=e226]:
              - generic [ref=e227]:
                - link "DevOps CI/CD Toolkit" [ref=e228] [cursor=pointer]:
                  - /url: /shop/devops-cicd-toolkit
                - generic [ref=e229]:
                  - img [ref=e230]
                  - generic [ref=e232]: "4.8"
              - paragraph [ref=e233]: Collection of premium GitHub Actions and GitLab CI templates.
              - generic [ref=e234]:
                - generic [ref=e236]:
                  - generic [ref=e237]: ₹49
                  - generic [ref=e238]: ₹89
                - button "Add to Cart" [ref=e239] [cursor=pointer]:
                  - img [ref=e240]
                  - text: Add to Cart
          - generic [ref=e244]:
            - generic [ref=e245]:
              - generic [ref=e246]: SAAS TOOL
              - generic [ref=e247]:
                - img [ref=e248]
                - text: Featured
            - generic [ref=e250]:
              - button [ref=e251] [cursor=pointer]:
                - img [ref=e252]
              - button [ref=e254] [cursor=pointer]:
                - img [ref=e255]
            - link "Formify Form Builder Quick View" [ref=e259] [cursor=pointer]:
              - /url: /shop/formify-builder
              - img "Formify Form Builder" [ref=e260]
              - generic [ref=e262]: Quick View
            - generic [ref=e263]:
              - generic [ref=e264]:
                - link "Formify Form Builder" [ref=e265] [cursor=pointer]:
                  - /url: /shop/formify-builder
                - generic [ref=e266]:
                  - img [ref=e267]
                  - generic [ref=e269]: "4.6"
              - paragraph [ref=e270]: Embeddable drag-and-drop form builder for any platform.
              - generic [ref=e271]:
                - generic [ref=e273]:
                  - generic [ref=e274]: ₹119
                  - generic [ref=e275]: ₹149
                - button "Add to Cart" [ref=e276] [cursor=pointer]:
                  - img [ref=e277]
                  - text: Add to Cart
          - generic [ref=e281]:
            - generic [ref=e283]: WEBSITE
            - generic [ref=e284]:
              - button [ref=e285] [cursor=pointer]:
                - img [ref=e286]
              - button [ref=e288] [cursor=pointer]:
                - img [ref=e289]
            - link "BlogMaster Next.js Template Quick View" [ref=e293] [cursor=pointer]:
              - /url: /shop/blogmaster-nextjs
              - img "BlogMaster Next.js Template" [ref=e294]
              - generic [ref=e296]: Quick View
            - generic [ref=e297]:
              - generic [ref=e298]:
                - link "BlogMaster Next.js Template" [ref=e299] [cursor=pointer]:
                  - /url: /shop/blogmaster-nextjs
                - generic [ref=e300]:
                  - img [ref=e301]
                  - generic [ref=e303]: "4.9"
              - paragraph [ref=e304]: Lightning fast statically generated blog template with MDX support.
              - generic [ref=e305]:
                - generic [ref=e308]: ₹39
                - button "Add to Cart" [ref=e309] [cursor=pointer]:
                  - img [ref=e310]
                  - text: Add to Cart
          - generic [ref=e314]:
            - generic [ref=e316]: MOBILE APP
            - generic [ref=e317]:
              - button [ref=e318] [cursor=pointer]:
                - img [ref=e319]
              - button [ref=e321] [cursor=pointer]:
                - img [ref=e322]
            - link "DeliveryX Mobile App Quick View" [ref=e326] [cursor=pointer]:
              - /url: /shop/delivery-x-app
              - img "DeliveryX Mobile App" [ref=e327]
              - generic [ref=e329]: Quick View
            - generic [ref=e330]:
              - generic [ref=e331]:
                - link "DeliveryX Mobile App" [ref=e332] [cursor=pointer]:
                  - /url: /shop/delivery-x-app
                - generic [ref=e333]:
                  - img [ref=e334]
                  - generic [ref=e336]: "4.4"
              - paragraph [ref=e337]: On-demand food and grocery delivery application template for iOS/Android.
              - generic [ref=e338]:
                - generic [ref=e340]:
                  - generic [ref=e341]: ₹199
                  - generic [ref=e342]: ₹249
                - button "Add to Cart" [ref=e343] [cursor=pointer]:
                  - img [ref=e344]
                  - text: Add to Cart
          - generic [ref=e348]:
            - generic [ref=e350]: AI MODEL
            - generic [ref=e351]:
              - button [ref=e352] [cursor=pointer]:
                - img [ref=e353]
              - button [ref=e355] [cursor=pointer]:
                - img [ref=e356]
            - link "VisionAI Object Recognition Quick View" [ref=e360] [cursor=pointer]:
              - /url: /shop/vision-ai-object-recognition
              - img "VisionAI Object Recognition" [ref=e361]
              - generic [ref=e363]: Quick View
            - generic [ref=e364]:
              - generic [ref=e365]:
                - link "VisionAI Object Recognition" [ref=e366] [cursor=pointer]:
                  - /url: /shop/vision-ai-object-recognition
                - generic [ref=e367]:
                  - img [ref=e368]
                  - generic [ref=e370]: "4.5"
              - paragraph [ref=e371]: Plug-and-play computer vision API wrap for real-time object tracking.
              - generic [ref=e372]:
                - generic [ref=e374]:
                  - generic [ref=e375]: ₹89
                  - generic [ref=e376]: ₹150
                - button "Add to Cart" [ref=e377] [cursor=pointer]:
                  - img [ref=e378]
                  - text: Add to Cart
          - generic [ref=e382]:
            - generic [ref=e383]:
              - generic [ref=e384]: BUNDLE
              - generic [ref=e385]:
                - img [ref=e386]
                - text: Featured
            - generic [ref=e388]:
              - button [ref=e389] [cursor=pointer]:
                - img [ref=e390]
              - button [ref=e392] [cursor=pointer]:
                - img [ref=e393]
            - link "Startup Bundle Megapack Quick View" [ref=e397] [cursor=pointer]:
              - /url: /shop/startup-bundle-megapack
              - img "Startup Bundle Megapack" [ref=e398]
              - generic [ref=e400]: Quick View
            - generic [ref=e401]:
              - generic [ref=e402]:
                - link "Startup Bundle Megapack" [ref=e403] [cursor=pointer]:
                  - /url: /shop/startup-bundle-megapack
                - generic [ref=e404]:
                  - img [ref=e405]
                  - generic [ref=e407]: "5"
              - paragraph [ref=e408]: "Everything you need to launch your startup: Website, App, and Backend."
              - generic [ref=e409]:
                - generic [ref=e411]:
                  - generic [ref=e412]: ₹299
                  - generic [ref=e413]: ₹600
                - button "Add to Cart" [ref=e414] [cursor=pointer]:
                  - img [ref=e415]
                  - text: Add to Cart
          - generic [ref=e419]:
            - generic [ref=e420]:
              - generic [ref=e421]: SAAS TOOL
              - generic [ref=e422]:
                - img [ref=e423]
                - text: Featured
            - generic [ref=e425]:
              - button [ref=e426] [cursor=pointer]:
                - img [ref=e427]
              - button [ref=e429] [cursor=pointer]:
                - img [ref=e430]
            - link "SaaS Billing Starter Kit Quick View" [ref=e434] [cursor=pointer]:
              - /url: /shop/saas-billing-starter
              - img "SaaS Billing Starter Kit" [ref=e435]
              - generic [ref=e437]: Quick View
            - generic [ref=e438]:
              - generic [ref=e439]:
                - link "SaaS Billing Starter Kit" [ref=e440] [cursor=pointer]:
                  - /url: /shop/saas-billing-starter
                - generic [ref=e441]:
                  - img [ref=e442]
                  - generic [ref=e444]: "4.7"
              - paragraph [ref=e445]: Complete Stripe integration template for subscription-based SaaS apps.
              - generic [ref=e446]:
                - generic [ref=e448]:
                  - generic [ref=e449]: ₹149
                  - generic [ref=e450]: ₹200
                - button "Add to Cart" [ref=e451] [cursor=pointer]:
                  - img [ref=e452]
                  - text: Add to Cart
          - generic [ref=e456]:
            - generic [ref=e458]: WEBSITE
            - generic [ref=e459]:
              - button [ref=e460] [cursor=pointer]:
                - img [ref=e461]
              - button [ref=e463] [cursor=pointer]:
                - img [ref=e464]
            - link "E-commerce UI Kit Pro Quick View" [ref=e468] [cursor=pointer]:
              - /url: /shop/ecommerce-ui-kit-pro
              - img "E-commerce UI Kit Pro" [ref=e469]
              - generic [ref=e471]: Quick View
            - generic [ref=e472]:
              - generic [ref=e473]:
                - link "E-commerce UI Kit Pro" [ref=e474] [cursor=pointer]:
                  - /url: /shop/ecommerce-ui-kit-pro
                - generic [ref=e475]:
                  - img [ref=e476]
                  - generic [ref=e478]: "4.9"
              - paragraph [ref=e479]: Premium React functional components for modern e-commerce websites.
              - generic [ref=e480]:
                - generic [ref=e482]:
                  - generic [ref=e483]: ₹79.5
                  - generic [ref=e484]: ₹120
                - button "Add to Cart" [ref=e485] [cursor=pointer]:
                  - img [ref=e486]
                  - text: Add to Cart
          - generic [ref=e490]:
            - generic [ref=e491]:
              - generic [ref=e492]: MOBILE APP
              - generic [ref=e493]:
                - img [ref=e494]
                - text: Featured
            - generic [ref=e496]:
              - button [ref=e497] [cursor=pointer]:
                - img [ref=e498]
              - button [ref=e500] [cursor=pointer]:
                - img [ref=e501]
            - link "FitTrack Pro Mobile App Quick View" [ref=e505] [cursor=pointer]:
              - /url: /shop/fittrack-pro
              - img "FitTrack Pro Mobile App" [ref=e506]
              - generic [ref=e508]: Quick View
            - generic [ref=e509]:
              - generic [ref=e510]:
                - link "FitTrack Pro Mobile App" [ref=e511] [cursor=pointer]:
                  - /url: /shop/fittrack-pro
                - generic [ref=e512]:
                  - img [ref=e513]
                  - generic [ref=e515]: "4.6"
              - paragraph [ref=e516]: A comprehensive fitness tracking mobile app template built with React Native.
              - generic [ref=e517]:
                - generic [ref=e519]:
                  - generic [ref=e520]: ₹129
                  - generic [ref=e521]: ₹199
                - button "Add to Cart" [ref=e522] [cursor=pointer]:
                  - img [ref=e523]
                  - text: Add to Cart
          - generic [ref=e527]:
            - generic [ref=e528]:
              - generic [ref=e529]: AI MODEL
              - generic [ref=e530]:
                - img [ref=e531]
                - text: Featured
            - generic [ref=e533]:
              - button [ref=e534] [cursor=pointer]:
                - img [ref=e535]
              - button [ref=e537] [cursor=pointer]:
                - img [ref=e538]
            - link "Nexus AI Article Generator Quick View" [ref=e542] [cursor=pointer]:
              - /url: /shop/nexus-ai-article-generator
              - img "Nexus AI Article Generator" [ref=e543]
              - generic [ref=e545]: Quick View
            - generic [ref=e546]:
              - generic [ref=e547]:
                - link "Nexus AI Article Generator" [ref=e548] [cursor=pointer]:
                  - /url: /shop/nexus-ai-article-generator
                - generic [ref=e549]:
                  - img [ref=e550]
                  - generic [ref=e552]: "4.8"
              - paragraph [ref=e553]: Generate high-quality SEO optimized articles in seconds using advanced AI models.
              - generic [ref=e554]:
                - generic [ref=e556]:
                  - generic [ref=e557]: ₹49.99
                  - generic [ref=e558]: ₹99.99
                - button "Add to Cart" [ref=e559] [cursor=pointer]:
                  - img [ref=e560]
                  - text: Add to Cart
        - generic [ref=e564]:
          - button [ref=e565] [cursor=pointer]:
            - img [ref=e566]
          - button "1" [ref=e568] [cursor=pointer]
          - button "2" [ref=e569] [cursor=pointer]
          - button "3" [ref=e570] [cursor=pointer]
          - button [ref=e571] [cursor=pointer]:
            - img [ref=e572]
    - generic [ref=e574]:
      - generic [ref=e575]:
        - generic [ref=e576]:
          - link "NexaStore" [ref=e577] [cursor=pointer]:
            - /url: /
            - img [ref=e579]
            - generic [ref=e582]: NexaStore
          - paragraph [ref=e583]: The world's premium digital marketplace. Buy, deploy, and scale your business with ready-made apps and AI models.
          - generic [ref=e584]:
            - link [ref=e585] [cursor=pointer]:
              - /url: https://twitter.com
              - img [ref=e586]
            - link [ref=e588] [cursor=pointer]:
              - /url: https://linkedin.com
              - img [ref=e589]
            - link [ref=e594] [cursor=pointer]:
              - /url: https://instagram.com
              - img [ref=e595]
            - link [ref=e598] [cursor=pointer]:
              - /url: https://github.com
              - img [ref=e599]
        - generic [ref=e603]:
          - heading "Company" [level=4] [ref=e604]
          - generic [ref=e605]:
            - link "About Us" [ref=e606] [cursor=pointer]:
              - /url: /about
              - img [ref=e607]
              - text: About Us
            - link "Careers" [ref=e609] [cursor=pointer]:
              - /url: /careers
              - img [ref=e610]
              - text: Careers
            - link "Blog" [ref=e612] [cursor=pointer]:
              - /url: /blog
              - img [ref=e613]
              - text: Blog
            - link "Contact" [ref=e615] [cursor=pointer]:
              - /url: /contact
              - img [ref=e616]
              - text: Contact
        - generic [ref=e618]:
          - heading "Marketplace" [level=4] [ref=e619]
          - generic [ref=e620]:
            - link "All Products" [ref=e621] [cursor=pointer]:
              - /url: /shop
              - img [ref=e622]
              - text: All Products
            - link "AI Models" [ref=e624] [cursor=pointer]:
              - /url: /shop?category=ai
              - img [ref=e625]
              - text: AI Models
            - link "Mobile Apps" [ref=e627] [cursor=pointer]:
              - /url: /shop?category=mobile
              - img [ref=e628]
              - text: Mobile Apps
            - link "Websites" [ref=e630] [cursor=pointer]:
              - /url: /shop?category=web
              - img [ref=e631]
              - text: Websites
        - generic [ref=e633]:
          - heading "Support" [level=4] [ref=e634]
          - generic [ref=e635]:
            - link "Documentation" [ref=e636] [cursor=pointer]:
              - /url: /docs
              - img [ref=e637]
              - text: Documentation
            - link "Sellers Guide" [ref=e639] [cursor=pointer]:
              - /url: /sellers
              - img [ref=e640]
              - text: Sellers Guide
            - link "Privacy Policy" [ref=e642] [cursor=pointer]:
              - /url: /privacy
              - img [ref=e643]
              - text: Privacy Policy
            - link "Terms of Service" [ref=e645] [cursor=pointer]:
              - /url: /terms
              - img [ref=e646]
              - text: Terms of Service
      - generic [ref=e649]:
        - paragraph [ref=e650]: © 2026 NexaStore. All rights reserved. Made with ✨ by Nexa
        - generic [ref=e651]:
          - generic [ref=e652]:
            - img [ref=e653]
            - text: support@nexastore.com
          - generic [ref=e656]:
            - img [ref=e657]
            - text: +91 (123) 456-7890
  - alert [ref=e659]
```

# Test source

```ts
  25  |     const toNumber = (t: string) => {
  26  |       const cleaned = t.replace("$", "").trim();
  27  |       const num = Number(cleaned);
  28  |       return Number.isFinite(num) ? num : null;
  29  |     };
  30  |     return cards.map((card) => {
  31  |       const spans = Array.from(card.querySelectorAll("span"))
  32  |         .map((s) => (s.textContent || "").trim())
  33  |         .filter((t) => t.startsWith("$"));
  34  |       if (!spans.length) return null;
  35  |       return toNumber(spans[0]);
  36  |     }).filter((n): n is number => typeof n === "number");
  37  |     }
  38  |   );
  39  |   return prices;
  40  | }
  41  | 
  42  | async function parseCartGrandTotal(page: any) {
  43  |   const el = page.locator('[data-testid="cart-grand-total"]').first();
  44  |   const txt = (await el.textContent()) || "";
  45  |   const num = Number(txt.replace("$", "").trim());
  46  |   return Number.isFinite(num) ? num : null;
  47  | }
  48  | 
  49  | async function parseFirstCartQuantity(page: any) {
  50  |   const el = page.locator('[data-testid="cart-quantity"]').first();
  51  |   const txt = (await el.textContent()) || "";
  52  |   const num = Number(txt.trim());
  53  |   return Number.isFinite(num) ? num : null;
  54  | }
  55  | 
  56  | test.describe.serial("Phase 3 - Page Tests", () => {
  57  |   test("Home -> Shop -> Product Detail -> Cart -> Auth -> Dashboard -> Checkout", async ({
  58  |     page,
  59  |   }) => {
  60  |     const prisma = new PrismaClient();
  61  |     const consoleErrors: string[] = [];
  62  |     const pageErrors: string[] = [];
  63  |     const badResponses: { url: string; status: number }[] = [];
  64  | 
  65  |     page.on("console", (msg) => {
  66  |       if (msg.type() === "error") consoleErrors.push(msg.text());
  67  |     });
  68  |     page.on("pageerror", (err) => {
  69  |       pageErrors.push(String(err));
  70  |     });
  71  |     page.on("response", (res) => {
  72  |       if (res.status() >= 400) {
  73  |         badResponses.push({ url: res.url(), status: res.status() });
  74  |       }
  75  |     });
  76  | 
  77  |     const expectNoErrors = async (step: string) => {
  78  |       if (consoleErrors.length || pageErrors.length) {
  79  |         const httpErrors = badResponses.length
  80  |           ? `\nHTTP errors (>=400) during ${step}:\n${badResponses
  81  |               .slice(0, 20)
  82  |               .map((r) => `${r.status} ${r.url}`)
  83  |               .join("\n")}`
  84  |           : "";
  85  |         throw new Error(
  86  |           `Console/page errors during ${step}:\n${formatErrors(
  87  |             consoleErrors.concat(pageErrors)
  88  |           )}${httpErrors}`
  89  |         );
  90  |       }
  91  |       if (badResponses.length) {
  92  |         throw new Error(
  93  |           `HTTP errors during ${step}:\n${badResponses
  94  |             .slice(0, 20)
  95  |             .map((r) => `${r.status} ${r.url}`)
  96  |             .join("\n")}`
  97  |         );
  98  |       }
  99  |       consoleErrors.length = 0;
  100 |       pageErrors.length = 0;
  101 |       badResponses.length = 0;
  102 |     };
  103 | 
  104 |     // Ensure registration credentials are fresh for repeated test runs.
  105 |     // Otherwise `/register` may fail with "Email already exists".
  106 |     await prisma.user.deleteMany({ where: { email: "testuser@test.com" } });
  107 |     await prisma.$disconnect();
  108 | 
  109 |     // TEST 1 — Home Page
  110 |     await page.goto("/");
  111 |     await page.waitForSelector("#shop");
  112 |     const homeAddToCartButtons = page.getByRole("button", {
  113 |       name: /add to cart/i,
  114 |     });
  115 |     await expect(homeAddToCartButtons.first()).toBeVisible({ timeout: 60000 });
  116 |     await expectNoErrors("Home");
  117 |     const featuredCount = await homeAddToCartButtons.count();
  118 |     expect(featuredCount).toBeGreaterThan(0);
  119 | 
  120 |     // TEST 2 — Shop Page
  121 |     await page.goto("/shop");
  122 |     const addToCartButtons = page.getByRole("button", {
  123 |       name: /add to cart/i,
  124 |     });
> 125 |     await expect(addToCartButtons).toHaveCount(10, { timeout: 60000 });
      |                                    ^ Error: expect(locator).toHaveCount(expected) failed
  126 |     await expectNoErrors("Shop initial");
  127 | 
  128 |     const shopAddToCartCount = await addToCartButtons.count();
  129 |     expect(shopAddToCartCount).toBe(10);
  130 | 
  131 |     // Search "SaaS"
  132 |     const searchInputs = page.locator('input[placeholder="Search products..."]');
  133 |     const inputCount = await searchInputs.count();
  134 |     let searchInput: any = null;
  135 |     for (let i = 0; i < inputCount; i++) {
  136 |       const candidate = searchInputs.nth(i);
  137 |       if (await candidate.isVisible()) {
  138 |         searchInput = candidate;
  139 |         break;
  140 |       }
  141 |     }
  142 |     expect(searchInput).not.toBeNull();
  143 |     await searchInput.fill("");
  144 |     await searchInput.type("SaaS");
  145 |     await page.waitForTimeout(250);
  146 |     await expectNoErrors("Shop search");
  147 | 
  148 |     const filteredCount = await getAddToCartCount(page);
  149 |     expect(filteredCount).toBeGreaterThan(0);
  150 |     expect(filteredCount).toBeLessThan(10);
  151 | 
  152 |     // Category filter "SaaS Tools"
  153 |     await page
  154 |       .getByRole("button", { name: "SaaS Tools" })
  155 |       .click();
  156 |     await page.waitForTimeout(250);
  157 |     await expectNoErrors("Shop category filter");
  158 |     const categoryCount = await getAddToCartCount(page);
  159 |     expect(categoryCount).toBeGreaterThan(0);
  160 |     expect(categoryCount).toBeLessThanOrEqual(10);
  161 | 
  162 |     // Sort price low to high
  163 |     await page.locator("select").selectOption("price-low");
  164 |     await page.waitForTimeout(250);
  165 |     await expectNoErrors("Shop sort");
  166 |     const prices = await getShopDisplayedPrices(page);
  167 |     expect(prices.length).toBeGreaterThan(0);
  168 |     for (let i = 1; i < prices.length; i++) {
  169 |       expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
  170 |     }
  171 | 
  172 |     // Add to cart from shop
  173 |     await addToCartButtons.first().click();
  174 |     await page.waitForTimeout(250);
  175 |     await expectNoErrors("Shop add to cart");
  176 | 
  177 |     await page.goto("/cart");
  178 |     await page.waitForSelector('[data-testid="cart-grand-total"]');
  179 |     await expectNoErrors("Cart after add");
  180 |     const cartQuantity1 = await parseFirstCartQuantity(page);
  181 |     expect(cartQuantity1).toBe(1);
  182 | 
  183 |     // TEST 3 — Product Detail page
  184 |     await page.goto("/shop");
  185 |     await expect(addToCartButtons).toHaveCount(10, { timeout: 60000 });
  186 |     await expectNoErrors("Shop before product detail");
  187 | 
  188 |     const productLink = page.locator('a[href^="/shop/"]').first();
  189 |     const productHref = await productLink.getAttribute("href");
  190 |     expect(productHref).toBeTruthy();
  191 |     const productSlug = String(productHref).split("/").pop();
  192 |     await productLink.click();
  193 |     await page.waitForSelector("h1");
  194 |     await expectNoErrors("Product detail load");
  195 | 
  196 |     // Verify detail content
  197 |     await expect(page.getByText(/features/i)).toBeVisible();
  198 |     await expect(page.getByText(/tech stack/i)).toBeVisible();
  199 |     await expect(
  200 |       page.getByRole("button", { name: /add to cart/i })
  201 |     ).toBeVisible();
  202 | 
  203 |     // Read current cart total by visiting /cart, then come back.
  204 |     await page.goto("/cart");
  205 |     await page.waitForSelector('[data-testid="cart-grand-total"]', { timeout: 60000 });
  206 |     await expectNoErrors("Cart before detail add");
  207 |     const totalBefore = (await parseCartGrandTotal(page)) ?? 0;
  208 | 
  209 |     await page.goto(`/shop/${productSlug}`);
  210 |     await page.waitForSelector("h1");
  211 |     await expectNoErrors("Product detail reload");
  212 | 
  213 |     // Add from detail
  214 |     await page.getByRole("button", { name: /add to cart/i }).click();
  215 |     await page.waitForTimeout(250);
  216 |     await expectNoErrors("Product detail add");
  217 | 
  218 |     await page.goto("/cart");
  219 |     await page.waitForSelector('[data-testid="cart-grand-total"]');
  220 |     await expectNoErrors("Cart after detail add");
  221 |     const totalAfter = (await parseCartGrandTotal(page)) ?? 0;
  222 |     expect(totalAfter).toBeGreaterThan(totalBefore);
  223 | 
  224 |     // TEST 4 — Cart page quantity + remove + totals + checkout link
  225 |     await page.waitForSelector('[data-testid="cart-quantity"]');
```