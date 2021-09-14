import puppeteer from "puppeteer";


describe("Display Texts", () => {
   let browser;
   let page;
 
   beforeAll(async () => {
     browser = await puppeteer.launch();
     page = await browser.newPage();
   });
 
   it("contains the contractors text", async () => {
     await page.goto("http://localhost:3000/contractors");
     await page.waitForSelector(".main-title");
     const text = await page.$eval(".main-title", (e) => e.textContent);
     expect(text).toContain("Contractors");
   });
   it("navigates to add new contractor view when clicking on AddContractor buttom", async () => {
      await page.goto("http://localhost:3000/contractors");
      await page.waitForSelector(".main-title");
      await page.click("#add-contractor-button");
      await page.waitForSelector(".create-contractor-title");
      const text = await page.$eval(".create-contractor-title", (e) => e.textContent);
      expect(text).toContain("Create Contractor");
    });

    it("shows the new contractor on the main page once added", async () => {
      await page.goto("http://localhost:3000/contractors/add");
  
      await page.click("#first-name");
      await page.type("#first-name", "first-name-test");

      await page.click("#last-name");
      await page.type("#last-name", "last-name-test");
  
      await page.click("#email");
      await page.type("#email", "test@test.com");

      await page.click("#phone-number");
      await page.type("#phone-number", "123456");

      await page.click("#image");
      await page.type("#image", "image");

      //press add contractor
      await page.click("#add-new-contractor");
      await page.goto("http://localhost:3000/contractors");
      await page.waitForSelector("#email");
      const text = await page.$eval("#email", (e) => e.textContent);
      expect(text).toContain("test@test.com");
    
    });

 
   afterAll(() => browser.close());
 });