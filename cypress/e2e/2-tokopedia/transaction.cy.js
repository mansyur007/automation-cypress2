import TokopediaPage from '../../support/pages/tokopediaPage';


describe("Tokopedia", { testIsolation: true }, () => {

    context("Buy Gaming Laptop", { testIsolation: false }, () => {
        it('Search for Gaming laptop', () => {
            cy.clearCookies();

            TokopediaPage.visit();
            TokopediaPage.closePopupIfExists();
            TokopediaPage.searchProduct("Laptop Gaming");
            TokopediaPage.verifySearchResult("Laptop Gaming");

            cy.scrollTo('bottom', { duration: 2000 });
            cy.scrollTo('bottom', { duration: 1000 });
            TokopediaPage.validateFooter()

            TokopediaPage.countProducts();
            TokopediaPage.listProductNames();
        });

        it('Filter by merchant type', () => {
            TokopediaPage.selectMerchantType('Mall')
            TokopediaPage.validateFilterApplied('Mall')
        });

        it('Sort cheaper', () => {
            cy.get('button[data-unify="Select"]').click();
            cy.get('button[data-unf="select-menu-item-btn"]')
                .contains('Harga Terendah')
                .click();
            TokopediaPage.validateFilterApplied('Harga Minimum')
        });

        it('Filter by price', () => {
            TokopediaPage.setPriceFilter(15000000, 20000000);
            TokopediaPage.validateFilterApplied('Harga Minimum')
            TokopediaPage.validateFilterApplied('Harga Maksimum')
        });

        it('Select Product', () => {
            cy.scrollTo('bottom', { duration: 2000 });
            cy.scrollTo('bottom', { duration: 1000 });
            cy.scrollTo('top', { duration: 1000 });
            cy.hold()
            cy.get('.css-5wh65g').eq(0).click()
        });

        it('Buy Product', () => {
            cy.get('button[data-testid="pdpBtnNormalSecondary"]').should('be.visible').click(); // Click Beli
        });

    })



})
