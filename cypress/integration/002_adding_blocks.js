describe( 'Adding blocks', () => {
	const lastBlockSelector = '.editor-visual-editor__block-edit:last [contenteditable="true"]:first';

	before( () => {
		cy.login( Cypress.env( 'username' ), Cypress.env( 'password' ) );
		cy.newPost();
	} );

	it( 'Should insert content using the placeholder', () => {
		cy.get( '[value="Write your story"]' ).click();
		cy.get( lastBlockSelector ).type( 'First Paragraph' );
	} );

	it( 'Should insert using the quick inserter', () => {
		cy.get( '.editor-visual-editor__inserter [aria-label="Insert Paragraph"]' ).click();
		cy.get( lastBlockSelector ).type( 'Second Paragraph' );
	} );

	it( 'Should insert using the regular inserter', () => {
		cy.get( '.editor-visual-editor [aria-label="Insert block"]' ).click();
		cy.get( '[placeholder="Search for a block"]' ).type( 'code' );
		cy.get( '.editor-inserter__block' ).contains( 'Code' ).click();
		cy.get( '[placeholder="Write code…"]' ).type( 'Code block' );
	} );

	it( 'Should insert using the slash command', () => {
		cy.get( '.editor-visual-editor__inserter [aria-label="Insert Paragraph"]' ).click();
		cy.get( lastBlockSelector ).type( '/quote{enter}' );
		cy.get( lastBlockSelector ).type( 'Quote block' );
	} );

	it( 'Should contain all the previoulsy inserted blocks', () => {
		cy.get( '.editor-mode-switcher [aria-label="More"]' ).click();
		cy.get( 'button' ).contains( 'Switch To Text Mode' ).click();

		// Assertions
		cy.get( '.editor-text-editor__textarea' )
			.should( 'contain', 'First Paragraph' )
			.should( 'contain', 'Second Paragraph' )
			.should( 'contain', 'Quote block' )
			.should( 'contain', 'Code block' );
	} );
} );
