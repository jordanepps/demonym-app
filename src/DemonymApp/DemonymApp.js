import React, { Component } from 'react';
import './DemonymApp.css';

import Demonym from '../Demonym/Demonym';
import CountrySelector from '../CountrySelector/CountrySelector';

export default class DemonymApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			countries: [],
			selected: null
		};
	}

	componentDidMount() {
		fetch('https://country.register.gov.uk/records.json?page-size=5000')
			.then(res => {
				if (!res.ok)
					throw new Error('Something went wrong, please try again later.');
				return res;
			})
			.then(res => res.json())
			.then(data => {
				const countries = Object.keys(data).map(key => data[key].item[0]);
				this.setState({ countries, error: null });
			})
			.catch(err => {
				this.setState({ error: err.message });
			});
	}

	setSelected(selected) {
		this.setState({ selected });
	}

	render() {
		const demon = this.state.selected ? (
			<Demonym
				name={this.state.selected['citizen-names']}
				country={this.state.selected.name}
			/>
		) : (
			<div className="demonym_app__placeholder">Select a country above</div>
		);
		const error = this.state.error ? (
			<div className="demonym_app__placeholder">{this.state.error}</div>
		) : (
			''
		);
		return (
			<div className="demonym_app">
				{error}
				<CountrySelector
					countries={this.state.countries}
					changeHandler={selected => this.setSelected(selected)}
				/>
				{demon}
			</div>
		);
	}
}
