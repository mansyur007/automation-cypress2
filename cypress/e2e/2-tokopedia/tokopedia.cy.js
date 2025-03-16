// import pages from '../../support/pages/login'
// import dashboard from '../../support/pages/dashboard'

describe("Tokopedia", { testIsolation: true }, () => {

    let userdata
    beforeEach(() => {
        cy.fixture('user-data.json').then((user) => {
            userdata = user;
        });

    })

    context("Inline Cypress Test", () => {
        it("Search product: Gaming laptop", () => {
            // visit the page
            // Tokopedia is a top Indonesian e-commerce platform
            cy.visit("https://www.tokopedia.com/", {
                headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" } // set user agent
            })

            // close when element exist
            cy.get('body').then(($parent) => {
                if ($parent.find('.css-11hzwo5').length > 0) {
                    cy.log('Element is exist')
                    cy.get('.css-11hzwo5').find('svg').click()
                } else {
                    cy.log('Element do not exist')
                }
            })

            // search product
            cy.get('input[aria-label="Cari di Tokopedia"]')
                .should('be.visible') // make sure the element is visible
                .type('Laptop Gaming{enter}'); // input text and press enter

            // verify result
            cy.url().should('include', 'search');
            cy.get('[data-testid="dSRPSearchInfo"]')
                .should('be.visible') // make sure the element is visible
                .and('contain.text', 'Laptop Gaming') // make sure the element contains text

            // scroll to element to lazy load
            cy.scrollTo('bottom', { duration: 2000 });
            cy.scrollTo('bottom', { duration: 3000 });

            // count data product
            cy.get('a[data-theme="default"]').then($elements => {
                cy.log('Number of elements found: ' + $elements.length);
            });

            // give more time to save video
            cy.log('Waiting for result');
            cy.wait(3000);
        });
    });


})
