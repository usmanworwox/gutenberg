/**
 * External dependencies
 */
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import MetaBoxIframe from './meta-boxes-iframe';
import MetaBoxPanel from './meta-boxes-panel';
import { getMetaBox } from '../selectors';

function MetaBox( { location, isActive } ) {
	if ( ! isActive ) {
		return null;
	}

	return (
		<MetaBoxPanel>
			<MetaBoxIframe location={ location } />
		</MetaBoxPanel>
	);
}

export default connect( ( state, ownProps ) => ( {
	isActive: getMetaBox( state, ownProps.location ).isActive,
} ) )( MetaBox );
