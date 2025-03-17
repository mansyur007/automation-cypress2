import { TOKOPEDIA_LOCATORS } from '../locator/tokopediaLocators';

class TokopediaPage {
    visit() {
        cy.visit(Cypress.env("tokopediaUrl"), {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            },
        });
    }

    closePopupIfExists() {
        cy.get('body').then(($parent) => {
            if ($parent.find(TOKOPEDIA_LOCATORS.CLOSE_POPUP).length > 0) {
                cy.get(TOKOPEDIA_LOCATORS.CLOSE_POPUP).click();
                cy.log('Popup closed');
            }
        });
    }

    searchProduct(productName) {
        cy.get(TOKOPEDIA_LOCATORS.SEARCH_INPUT)
            .should('be.visible')
            .type(`${productName}{enter}`);
    }

    verifySearchResult(expectedText) {
        cy.url().should('include', 'search');
        cy.get(TOKOPEDIA_LOCATORS.SEARCH_RESULT_INFO)
            .should('be.visible')
            .and('contain.text', expectedText);
    }

    countProducts() {
        cy.get(TOKOPEDIA_LOCATORS.PRODUCT_LINKS).then($elements => {
            cy.log(`Number of products found: ${$elements.length}`);
        });
    }

    listProductNames() {
        cy.get(TOKOPEDIA_LOCATORS.PRODUCT_NAMES).each(($el, index) => {
            cy.log(`Product ${index + 1}: ${$el.text()}`);
        });
    }

    setPriceFilter(minPrice, maxPrice) {
        cy.get(TOKOPEDIA_LOCATORS.MIN_PRICE_INPUT)
            .scrollIntoView()
            .clear()
            .type(`${minPrice}{enter}`);
        cy.get(TOKOPEDIA_LOCATORS.MAX_PRICE_INPUT)
            .clear()
            .type(`${maxPrice}{enter}`);
    }

    validatePrices(minPrice, maxPrice) {
        cy.get(TOKOPEDIA_LOCATORS.PRODUCT_PRICES).each(($el) => {
            const priceText = $el.text().replace(/[^\d]/g, ''); // Remove "Rp" and non-numeric characters
            const price = parseInt(priceText, 10);

            // Navigate to the common parent before searching for product name
            cy.wrap($el).closest(TOKOPEDIA_LOCATORS.PRODUCT_CONTAINER)
                .find(TOKOPEDIA_LOCATORS.PRODUCT_NAMES)
                .invoke('text')
                .then((productName) => {
                    productName = productName.trim(); // Trim whitespace

                    if (price < minPrice || price > maxPrice) {
                        cy.log(`Price out of range for "${productName}": Rp${price.toLocaleString()}`);
                        cy.log(`Validating prices within range: Rp${minPrice.toLocaleString()} - Rp${maxPrice.toLocaleString()}`);
                        throw new Error(`Price out of range for "${productName}": Rp${price.toLocaleString()} - Validating prices within range: Rp${minPrice.toLocaleString()} - Rp${maxPrice.toLocaleString()}`);
                    } else {
                        cy.log(`Price valid for "${productName}": Rp${price.toLocaleString()}`);
                    }

                    // Assert price is within range
                    expect(price).to.be.gte(minPrice);
                    expect(price).to.be.lte(maxPrice);
                });
        });
    }

    validatePricesWithMargin(minPrice, maxPrice) {
        // Apply a 5% margin
        const marginMin = minPrice * 0.95; // 5% below minPrice
        const marginMax = maxPrice * 1.05; // 5% above maxPrice

        cy.log(`Validating prices within range: Rp${marginMin.toLocaleString()} - Rp${marginMax.toLocaleString()}`);

        cy.get(TOKOPEDIA_LOCATORS.PRODUCT_PRICES).each(($el) => {
            const priceText = $el.text().replace(/[^\d]/g, ''); // Remove "Rp" and non-numeric characters
            const price = parseInt(priceText, 10);

            // Navigate to the common parent before searching for product name
            cy.wrap($el).closest(TOKOPEDIA_LOCATORS.PRODUCT_CONTAINER)
                .find(TOKOPEDIA_LOCATORS.PRODUCT_NAMES)
                .invoke('text')
                .then((productName) => {
                    productName = productName.trim(); // Trim whitespace

                    if (price < marginMin || price > marginMax) {
                        cy.log(`Price out of range for "${productName}": Rp${price.toLocaleString()} (Expected: Rp${marginMin.toLocaleString()} - Rp${marginMax.toLocaleString()})`);
                        throw new Error(`Price out of range for "${productName}": Rp${price.toLocaleString()} (Expected: Rp${marginMin.toLocaleString()} - Rp${marginMax.toLocaleString()})`);
                    } else {
                        cy.log(`Price valid for "${productName}": Rp${price.toLocaleString()} (Within range: Rp${marginMin.toLocaleString()} - Rp${marginMax.toLocaleString()})`);
                    }

                    // Assert price is within range
                    expect(price).to.be.gte(marginMin);
                    expect(price).to.be.lte(marginMax);
                });
        });
    }

}

export default new TokopediaPage();
