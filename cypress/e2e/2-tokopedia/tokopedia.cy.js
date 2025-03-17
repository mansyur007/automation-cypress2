import TokopediaPage from '../../support/pages/tokopediaPage';


describe("Tokopedia", { testIsolation: true }, () => {

    let userdata
    beforeEach(() => {
        cy.fixture('user-data.json').then((user) => {
            userdata = user
        })

    })

    context("Inline Cypress Test", () => {
        it("Search product: Gaming laptop", () => {
            // visit the page
            // Tokopedia is a top Indonesian e-commerce platform
            cy.visit("https://www.tokopedia.com/", {
                headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" } // set user agent
            })

            // close popup when element exist
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
                .type('Laptop Gaming{enter}') // input text and press enter

            // verify result
            cy.url().should('include', 'search')
            cy.get('[data-testid="dSRPSearchInfo"]')
                .should('be.visible') // make sure the element is visible
                .and('contain.text', 'Laptop Gaming') // make sure the element contains text

            // scroll to element to lazy load
            cy.scrollTo('bottom', { duration: 2000 })
            cy.scrollTo('bottom', { duration: 2000 })

            // count data product
            cy.get('a[data-theme="default"]').then($elements => {
                cy.log('Number of elements found: ' + $elements.length)
            })

            // get product name
            cy.get('span[class="_0T8-iGxMpV6NEsYEhwkqEg=="]').each(($el, index) => {
                cy.log(`Product ${index + 1}: ` + $el.text())
            })

            // filter by price
            cy.get('input[data-testid="iptSRPMinPriceFilter"]')
                .scrollIntoView()
                .clear()
                .type('10000000{enter}')
            cy.get('input[data-testid="iptSRPMaxPriceFilter"]')
                .clear()
                .type('30000000{enter}')

            // scroll to element to lazy load
            cy.scrollTo('bottom', { duration: 2000 })
            cy.scrollTo('bottom', { duration: 2000 })

            // Get all displayed prices and validate
            cy.get('div[class*="_67d6E1xDKIzw+i2D2L0tjw== t4jWW3NandT5hvCFAiotYg=="]').each(($el) => {
                const priceText = $el.text().replace(/[^\d]/g, ''); // Remove "Rp" and dots
                const price = parseInt(priceText, 10);

                // Find the closest product name from the parent
                const productName = $el.parent('div[class*="product-container"]').find('span[class*="_0T8-iGxMpV6NEsYEhwkqEg=="]').text().trim();

                // Check if the price is out of range
                if (price < 10000000 || price > 30000000) {
                    cy.log(`Price out of range for "${productName}": Rp${price.toLocaleString()}`);
                    throw new Error(`Price out of range for "${productName}": Rp${price.toLocaleString()}`);
                } else {
                    cy.log(`Price valid for "${productName}": Rp${price.toLocaleString()}`);
                }

                // Assert the price is within the range
                expect(price).to.be.gte(10000000);
                expect(price).to.be.lte(30000000);
            });

            // give more time to save video
            cy.log('Waiting for result')
            cy.wait(3000)
        })
    })

    context("POM Cypress test", () => {
        it("Search product: Gaming laptop 5-10 Million", () => {
            TokopediaPage.visit();
            TokopediaPage.closePopupIfExists();
            TokopediaPage.searchProduct("Laptop Gaming");
            TokopediaPage.verifySearchResult("Laptop Gaming");

            cy.scrollTo('bottom', { duration: 2000 });
            cy.scrollTo('bottom', { duration: 2000 });

            TokopediaPage.countProducts();
            TokopediaPage.listProductNames();

            TokopediaPage.setPriceFilter(5000000, 10000000);
            cy.scrollTo('bottom', { duration: 2000 });
            cy.scrollTo('bottom', { duration: 2000 });

            TokopediaPage.validatePrices(5000000, 10000000);

            cy.wait(3000);
        });

        it("Search product: Gaming laptop 10-15 Million", () => {
            TokopediaPage.visit();
            TokopediaPage.closePopupIfExists();
            TokopediaPage.searchProduct("Laptop Gaming");
            TokopediaPage.verifySearchResult("Laptop Gaming");

            cy.scrollTo('bottom', { duration: 2000 });
            cy.scrollTo('bottom', { duration: 2000 });

            TokopediaPage.countProducts();
            TokopediaPage.listProductNames();

            TokopediaPage.setPriceFilter(10000000, 15000000);
            cy.scrollTo('bottom', { duration: 2000 });
            cy.scrollTo('bottom', { duration: 2000 });

            TokopediaPage.validatePrices(10000000, 15000000);

            cy.wait(3000);
        });

        it("Search product: Gaming laptop 15-20 Million with error margin", () => {
            TokopediaPage.visit();
            TokopediaPage.closePopupIfExists();
            TokopediaPage.searchProduct("Laptop Gaming");
            TokopediaPage.verifySearchResult("Laptop Gaming");

            cy.scrollTo('bottom', { duration: 2000 });
            cy.scrollTo('bottom', { duration: 2000 });

            TokopediaPage.countProducts();
            TokopediaPage.listProductNames();

            TokopediaPage.setPriceFilter(15000000, 20000000);
            cy.scrollTo('bottom', { duration: 2000 });
            cy.scrollTo('bottom', { duration: 2000 });

            TokopediaPage.validatePricesWithMargin(15000000, 20000000);

            cy.wait(3000);
        });
    });



})
