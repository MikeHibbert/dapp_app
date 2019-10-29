import React, {Component} from 'react';

class Search extends Component {
    onChange(event) {

    }

    render() {
        return ( <>
            <form method="get" action="page-search.html" className="search pull-left hidden-xs">
                <input type="text" className="form-control" name="k" onChange={(e) => this.onChange(e)} placeholder="Search for something..." />
            </form>
            </>
        )
    }
}

export default Search;