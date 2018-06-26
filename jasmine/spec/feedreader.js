/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* All tests placed within the $() function,
 * since some of these tests may require DOM elements - to ensure
 * they don't run until the DOM is ready.
 */
$(function() {

    /*
     * "RSS Feeds" test suite
     */

    describe('RSS Feeds', function() {
        /* Test 1: to make sure that the allFeeds variable
         * has been defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test 2: loops through each feed in the allFeeds object and
         * ensures it has a URL defined and that the URL is not empty.
         */
         it('have URL defined', function() {
           allFeeds.forEach(function(feed) {
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0);
           });
         });

        /* Test 3: loops through each feed in the allFeeds object and
         * ensures it has a name defined and that the name is not empty.
         */
         it('have name defined', function() {
           allFeeds.forEach(function(feed) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           });
         });
    });

    /*
     * "The menu" test suite
     */

    describe('The menu', function() {

        /* Test 4: ensures the menu element is hidden by default.
         */
         it('has menu element hidden by default', function() {
           let body = document.querySelector('body');
           expect(body.classList.contains('menu-hidden')).toBe(true);
         });

         /* Test 5: ensures the menu changes visibility when the menu icon
          * is clicked.
          * Includes two expectations: the menu displays when clicked and
          * menu hides when clicked again.
          */
          it('changes visibility when the menu icon is clicked', function() {
            let body = document.querySelector('body');
            let icon = document.querySelector('.menu-icon-link');

            icon.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);

            icon.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
          });
    });

    /*
     * "Initial Entries" test suite
     */

    describe('Initial Entries', function() {

        /* Test 6: ensures when the loadFeed function is called and
         * completes its work, there is at least a single .entry element
         * within the .feed container.
         * IMPORTANT: loadFeed() is asynchronous so this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done) {
           loadFeed(0, function() {
             done();
           });
         });

         it('have at least one entry within feed container', function(done) {
           let feedEntries = document.querySelector('.feed').querySelectorAll('.entry');

           expect(feedEntries.length).toBeGreaterThan(0);
           done();
         });
    });

    /*
     * "New Feed Selection" test suite
     */

    describe('New Feed Selection', function() {

        /* Test 7: ensures when a new feed is loaded by the loadFeed function
         * that the content actually changes.
         * IMPORTANT: loadFeed() is asynchronous.
         * Compares content of previous and new feed.
         */
         let prevFeed;
         let newFeed;

         beforeEach(function(done) {
           loadFeed(0, function() {
             prevFeed = document.querySelector('.feed').innerHTML;

             loadFeed(1, function() {
               newFeed = document.querySelector('.feed').innerHTML;
               done();
             });
           });
         });

         it('should change feed content', function(done) {
           expect(newFeed).not.toBe(prevFeed);
           done();
         });
    });
}());
