// @ts-check
import { test, expect } from '@playwright/test';

// Base URL for the Swift Translator
const BASE_URL = 'https://www.swifttranslator.com/';

// Helper function to perform translation and get output
/**
 * @param {any} page
 * @param {string} input
 * @returns {Promise<string>}
 */
async function translateAndGetOutput(page, input) {
  // Navigate to the page
  await page.goto(BASE_URL);

  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  // Find the input textbox by its placeholder
  const inputField = page.getByPlaceholder('Input Your Singlish Text Here.');
  await inputField.click();
  await inputField.fill(input);

  // Wait for real-time translation
  await page.waitForTimeout(2500);

  // Click elsewhere to close any suggestion dropdown
  await page.locator('body').click({ position: { x: 10, y: 10 } });
  await page.waitForTimeout(500);

  // Get the output from the Sinhala section
  const sinhalaContainer = page.locator('div').filter({ hasText: /^Sinhala$/ }).first();
  const outputDiv = sinhalaContainer.locator('xpath=following-sibling::div[1]');

  let output = '';
  try {
    output = await outputDiv.textContent({ timeout: 5000 });
  } catch (e) {
    // Fallback: try to find output by looking for Sinhala text in the right panel
    const rightPanel = page.locator('.col-span-12 >> nth=1').locator('div').filter({ has: page.locator('button:has-text("Copy")') });
    const allText = await rightPanel.locator('..').textContent();
    output = allText?.replace('Sinhala', '').replace('CopyClear', '').trim() || '';
  }

  return output || '';
}

test('Pos_Fun_0001: Convert a short daily phrase', async ({ page }) => {
  const input = 'mama vaevata yanavaa.';
  const expectedOutput = 'මම වැවට යනවා.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0001`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0002: Convert a short daily greeting phrase', async ({ page }) => {
  const input = 'suBha dhavasak!';
  const expectedOutput = 'සුභ දවසක්!';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0002`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0003: Compound sentences', async ({ page }) => {
  const input = 'api kadeeta yanna hadhanne gihin avith tikak kathaa karamu.';
  const expectedOutput = 'අපි කඩේට යන්න හදන්නෙ ගිහින් අවිත් ටිකක් කතා කරමු.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0003`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0004: Interrogative forms', async ({ page }) => {
  const input = 'oya dhavalta kaaladha inne?';
  const expectedOutput = 'ඔය දවල්ට කාලද ඉන්නේ?';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0004`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0005:  imperative forms', async ({ page }) => {
  const input = 'gedhara yanna.';
  const expectedOutput = 'ගෙදර යන්න.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0005`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0006:  Frequently used day-to-day expressions', async ({ page }) => {
  const input = 'mama ballonta bayayi.';
  const expectedOutput = 'මම බල්ලොන්ට බයයි.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0006`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0007: Repeated word expressions used for emphasis', async ({ page }) => {
  const input = 'ela ela';
  const expectedOutput = 'එල එල';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0007`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0008:  Positive forms', async ({ page }) => {
  const input = 'api iridhaata gedhara enavaa';
  const expectedOutput = 'අපි ඉරිදාට ගෙදර එනවා';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0008`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0009: Currency measurement', async ({ page }) => {
  const input = 'Rs.290000 gevanna thiyenavaa.';
  const expectedOutput = 'Rs.290000 ගෙවන්න තියෙනවා.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0009`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0010: Time formats measurement', async ({ page }) => {
  const input = '8.30 AM venakota suudhaanam vela inna.';
  const expectedOutput = '8.30 AM වෙනකොට සූදානම් වෙල ඉන්න.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0010`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0011: Missing spaces / joined words (stress test)', async ({ page }) => {
  const input = 'mamagameeyanavaa.';
  const expectedOutput = 'මමගමේයනවා.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0011`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0012: Request forms with varying degrees of politeness', async ({ page }) => {
  const input = 'karuNaakarala mata udhav karanna puluvandha magee laptop eka kaedila.';
  const expectedOutput = 'කරුණාකරල මට උදව් කරන්න පුලුවන්ද මගේ laptop එක කැඩිල.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0012`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0013: English technical/brand terms embedded in Singlish ', async ({ page }) => {
  const input = 'mata heta ZOOM meeting ekak thiyala mata maga aerunu paadam tika kiyala dhenna.';
  const expectedOutput = 'මට හෙට ZOOM meeting එකක් තියල මට මග ඇරුනු පාඩම් ටික කියල දෙන්න.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0013`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0014: English abbreviations and short forms', async ({ page }) => {
  const input = 'magee computer eeke CPU , GPU dhekama pichchilaa eeka hadhagena enna mageth ekka kadeta gihin emudha?';
  const expectedOutput = 'මගේ computer ඒකෙ CPU , GPU දෙකම පිච්චිලා ඒක හදගෙන එන්න මගෙත් එක්ක කඩෙට ගිහින් එමුද?';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0014`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0015: Sentences containing places and common English words that should remain as they are', async ({ page }) => {
  const input = 'magee SLIIT ID eka naethivelaa eka naevatha hadhaganna mata help karanna puluvandha';
  const expectedOutput = 'මගේ SLIIT ID එක නැතිවෙලා එක නැවත හදගන්න මට help කරන්න පුලුවන්ද';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0015`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0016:  Line breaks', async ({ page }) => {
  const input = 'api heta chithrapatiyak balanna yanavaa.\noyalath enavadha apith ekka yanna?';
  const expectedOutput = 'අපි හෙට චිත්‍රපටියක් බලන්න යනවා.\nඔයලත් එනවද අපිත් එක්ක යන්න?';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0016`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0017: Slang and colloquial phrasing', async ({ page }) => {
  const input = 'machan mama mee siravatama kiyanne ban dhaennam epavela thiyenne nikan idhala hariyanne naee mokak hari kanna ooni.';
  const expectedOutput = 'මචන් මම මේ සිරවටම කියන්නෙ බන් දැන්නම් එපවෙල තියෙන්නෙ නිකන් ඉදල හරියන්නේ නෑ මොකක් හරි කන්න ඕනි.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0017`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0018: Complex sentence', async ({ page }) => {
  const input = 'dhitvaa suLi kuNaatuva samaGa aethi vuu gQQvathura saha naayayaeem heethuven maarga sQQvarDhana aDhikaariya sathu maarga bohoma pramaaNayak vinaashayata path vuna.meeka nisa pravaahana gaman bohoma amarui kiyalaa janathaa kiyala thiyennee. mahaamaarga saha naagarika sQQvarDhana amaathYA bimal rathnaayaka meeka gana vistharathmaka prakashayak karalaa thibuna.';
  const expectedOutput = 'දිට්වා සුළි කුණාටුව සමඟ ඇති වූ ගංවතුර සහ නායයෑම් හේතුවෙන් මාර්ග සංවර්ධන අධිකාරිය සතු මාර්ග බොහොම ප්‍රමාණයක් විනාශයට පත් වුන.මේක නිස ප්‍රවාහන ගමන් බොහොම අමරුඉ කියලා ජනතා කියල තියෙන්නේ. මහාමාර්ග සහ නාගරික සංවර්ධන අමාත්‍ය බිමල් රත්නායක මේක ගන විස්තරත්මක ප්‍රකශයක් කරලා තිබුන.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0018`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0019: Paragraph input (Long text)', async ({ page }) => {
  const input = 'ada havasa 5 ta meeting ekak thiyenava. oyaata puluvannam enna. naeththam record eka ahanna. api project eka gaena katha karanava.ee velavata enna baerinam mata kalin call ekak aran kiyanna.';
  const expectedOutput = 'අඩ හවස 5 ට meeting එකක් තියෙනව. ඔයාට පුලුවන්නම් එන්න. නැත්තම් record එක අහන්න. අපි project එක ගැන කත කරනව.ඒ වෙලවට එන්න බැරිනම් මට කලින් call එකක් අරන් කියන්න.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0019`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0020: Convert the Sinhala + English sentences', async ({ page }) => {
  const input = 'mama adha cricket gahanna yanvaa. ee hindha mata meeting ekata enna ven naee. sir ta message ekak dhaanna kiyanna mata class ekata ennee naee kiyala haridha';
  const expectedOutput = 'මම අද cricket ගහන්න යන්වා. ඒ හින්ද මට meeting එකට එන්න වෙන් නෑ. sir ට message එකක් දාන්න කියන්න මට class එකට එන්නේ නෑ කියල හරිද';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0020`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0021: Convert formal sentence', async ({ page }) => {
  const input = 'ovuhu raajakaari saDHAhaa pitavagos sitiyooya.';
  const expectedOutput = 'ඔවුහු රාජකාරි සඳහා පිටවගොස් සිටියෝය.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0021`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0022: Greeting aimed at a friend', async ({ page }) => {
  const input = 'kohomadha machan, vaeda ivaradha?';
  const expectedOutput = 'කොහොමද මචන්, වැඩ ඉවරද?';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0022`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0023: Repeated word expressions used for emphasis', async ({ page }) => {
  const input = 'nae nae';
  const expectedOutput = 'නැ නැ';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0023`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_Fun_0024: Polite request to a lecturer/senior', async ({ page }) => {
  const input = 'karuNaakaralaa mata deadline eka extend karanna.';
  const expectedOutput = 'කරුණාකරලා මට deadline එක extend කරන්න.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Pos_Fun_0024`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Neg_Fun_0001:  Multiple consecutive spaces', async ({ page }) => {
  const input = 'm a m a p a n s a l y a n a v a a kiyalaa liyala thiyennee';
  const expectedOutput = 'මම පන්සල් යනවා කියලා ලියල තියෙන්නේ';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Neg_Fun_0001`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Neg_Fun_0002: Only puntuation marks input', async ({ page }) => {
  const input = 'm a c ha n bokk a. . . . m o k a d h a venne?';
  const expectedOutput = 'මචන් බොක්ක.... මොකද වෙන්නෙ?';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Neg_Fun_0002`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Neg_Fun_0003: Mixed Singlish with chat abbreviations', async ({ page }) => {
  const input = 'mama tmrw office enna hithaana inne bcz meeting ekak tnx bro';
  const expectedOutput = 'මම හෙට office එන්න හිතාන ඉන්නේ මොකද meeting එකක් ස්තුති සහොදරයා';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Neg_Fun_0003`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Neg_Fun_0004: Extremely long concatenated word', async ({ page }) => {
  const input = 'mamapooyatapansalgihinsilganayanava';
  const expectedOutput = 'මම පෝයට පන්සල් ගිහින් සිල් ගන්නව';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Neg_Fun_0004`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Neg_Fun_0005: Loss of accuracy in long conversational paragraph with mixed content', async ({ page }) => {
  const input = 'adha udhae indhala mama bohoma busy unaa. office eke meeting thibuna eka passe client kenek call karalaa bohoma amathaka deyakata katha karanna patan gaththa. mama eka note karaganna hithuwoth spellings hariyata balanna thiyenney nae. passe mama gedhara enakota traffic bohoma thibuna nisa late unaa.';
  const expectedOutput = 'අද උදේ ඉදල මම බොහොම කාර්යබහුල උනා. office eke හමුවක් තිබුන එක පස්සෙ පරිබොගික කෙනෙක් call කරලා බොහොම අමතක දෙයකට කතා කරන්න පටන් ගත්ත. මම එක සටහන් කරගන්න හිතුවොත් අකුරු හරියට බලන්න තියෙන්නෙ නැ. පස්සෙ මම ගෙදර එනකොට වාහන තදබදය බොහොම තිබුන නිස පරක්කු උනා.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Neg_Fun_0005`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Neg_Fun_0006: Numbers-only input', async ({ page }) => {
  const input = 'ovuhu        mu h ud hu          gav eesh anaya         saDHAhaa           pitavagos         sitiyooya. ';
  const expectedOutput = 'ඔවුහු මුහුදු ගවේශනය සඳහා පිටවගොස් සිටියෝය. ';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Neg_Fun_0006`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Neg_Fun_0007: Complex joined words produce incorrect output', async ({ page }) => {
  const input = 'matakoththuvakkannaooni';
  const expectedOutput = 'මට කොත්තුවක් කන්න ඕනි';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Neg_Fun_0007`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Neg_Fun_0008: Input field accepts but cannot process emoji', async ({ page }) => {
  const input = 'mama kaanival ekata yanavaa 😁';
  const expectedOutput = 'Emoji may pass through or cause translation issues';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Neg_Fun_0008`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Neg_Fun_0009: Multiple consecutive spaces in input', async ({ page }) => {
  const input = 'mama       oyaata        godak        aadhareyi.';
  const expectedOutput = 'මම ඔයාට ගොඩක් ආදරෙයි.';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Neg_Fun_0009`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Neg_Fun_0010: Missing spaces with long compound word', async ({ page }) => {
  const input = 'apiokkomanaendhalaagegedharagiyothvaeleethiyenaredhitikagannekavdha?';
  const expectedOutput = 'අපි ඔක්කොම නැන්දලාගෙ ගෙදර ගියොත් වැලේ තියෙන රෙදි ටික ගන්නෙ කව්ද?';

  const actualOutput = await translateAndGetOutput(page, input);

  console.log(`TC ID: Neg_Fun_0010`);
  console.log(`Input: ${input}`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Actual: ${actualOutput}`);

  expect(actualOutput).toBe(expectedOutput);
});

test('Pos_UI_0001: Multiple rapid edits handled smoothly', async ({ page }) => {
  const expectedOutput = 'මම යනවා';

  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  const inputField = page.getByPlaceholder('Input Your Singlish Text Here.');

  // Simulate rapid typing
  await inputField.fill('ma');
  await page.waitForTimeout(200);
  await inputField.fill('mama');
  await page.waitForTimeout(200);
  await inputField.fill('mama ya');
  await page.waitForTimeout(200);
  await inputField.fill('mama yanavaa');

  // Wait for final translation
  await page.waitForTimeout(3000);

  // Click elsewhere to close suggestions
  await page.locator('body').click({ position: { x: 10, y: 10 } });
  await page.waitForTimeout(500);

  // Get output
  const sinhalaContainer = page.locator('div').filter({ hasText: /^Sinhala$/ }).first();
  const outputDiv = sinhalaContainer.locator('xpath=following-sibling::div[1]');
  const finalOutput = await outputDiv.textContent() || '';

  console.log(`TC ID: Pos_UI_0001`);
  console.log(`Final Input: mama yanavaa`);
  console.log(`Expected: ${expectedOutput}`);
  console.log(`Final Output: ${finalOutput}`);

  expect(finalOutput).toBe(expectedOutput);
});