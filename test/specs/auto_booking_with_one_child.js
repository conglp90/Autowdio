import { remote } from 'webdriverio'

// init chrome with --disable-notifications flag
const browser = await remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--disable-notifications'
            ]
        }
    }
})

// go to page
await browser.url('https://www.bestprice.vn')

// pick departure
const element = await browser.$('//label[@class="btn_flight_icon" and contains(text(), "Điểm đi")]');
await element.click();
const departure_query = await browser.$('#flight_search_form input[placeholder="Mã sân bay, Tên sân bay, Tên thành phố..."]');
await departure_query.setValue('han');
const departure_dropdown = await browser.$('//form[@id="flight_search_form"]//span[contains(@class, "tt-dropdown-menu")]')
await departure_dropdown.waitForClickable({ timeout: 5000 });
const departure = await departure_dropdown.$('//strong[contains(text(), "HAN")]');
await departure.waitForClickable({ timeout: 5000 });
await departure.click();

// pick destination
const destination_query = await browser.$('#to_des input[placeholder="Mã sân bay, Tên sân bay, Tên thành phố..."]');
await destination_query.setValue('ho c');
const destination_dropdown = await browser.$('#to_des span.tt-dropdown-menu');
await destination_dropdown.waitForClickable({ timeout: 5000 });
const html2 = await destination_dropdown.getHTML();
const destination = await departure_dropdown.$('//strong[contains(text(), "SGN")]');
await destination.waitForClickable({ timeout: 5000 });
await destination.click();

// pick departure_date
const departure_calendar = await browser.$('//*[@id="flight_search_form"]/div[1]/div[3]/i');
await departure_calendar.waitForClickable({ timeout: 5000 });
await departure_calendar.click();
const departure_date = await browser.$('//*[@id="ui-datepicker-div"]/div[1]/table/tbody/tr[5]/td[1]/a/span[1]');
await departure_date.waitForClickable({ timeout: 5000 });
await departure_date.click();
await new Promise(resolve => setTimeout(resolve, 100));

// pick destination_date
const destination_calendar = await browser.$('//*[@id="flight_search_form"]/div[1]/div[4]/i');
await destination_calendar.waitForClickable({ timeout: 5000 });
await destination_calendar.click();
const destination_date = await browser.$('//*[@id="ui-datepicker-div"]/div[2]/table/tbody/tr[1]/td[3]/a');
await destination_date.waitForClickable({ timeout: 5000 });
await destination_date.click();
await new Promise(resolve => setTimeout(resolve, 100));

// plus a child
const passenger = await browser.$('//*[@id="flight_search_form"]/div[1]/div[5]/div/label');
await passenger.waitForClickable({ timeout: 5000 });
await passenger.click();
await new Promise(resolve => setTimeout(resolve, 1000));

const child = await browser.$('/html/body/div[4]/div[2]/div/div[2]/div[2]/div/span[2]/div');
await child.waitForClickable({ timeout: 5000 });
await child.click();
await new Promise(resolve => setTimeout(resolve, 100));

// search
const search = await browser.$('/html/body/main/section[2]/div/div[1]/form/div[2]/div[2]/button');
await search.waitForClickable({ timeout: 5000 });
await search.click();

// pause 15s to view then capture a screenshot and exit
await new Promise(resolve => setTimeout(resolve, 15000));
await browser.saveScreenshot('./screenshot.png')
await browser.deleteSession()

