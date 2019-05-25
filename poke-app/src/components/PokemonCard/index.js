import React, { Component } from 'react';

class PokemonCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pokemon: '',
            choice: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.choice !== this.props.choice) {
            this.setState({
                choice: nextProps.choice
            });

            fetch('https://pokeapi.co/api/v2/pokemon/' + nextProps.choice)
            .then((response) => {
                return response.json();
            })
            .then((pokemon) => {
                this.setState({
                    pokemon: pokemon
                });
            })
        }
    }

    render() {
        return (
            <div>
                Pokemon Card Placeholder : { this.state.pokemon.name }
            </div>
        );
    }

}

export default PokemonCard;
