import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pokemon: [],
            loaded: false
        }
    }

    componentDidMount() {
        for (let i = 1; i <= 151; i++) {
            let url = 'https://pokeapi.co/api/v2/pokemon/' + i;

            fetch(url)
            .then((pokemon) => {
                return pokemon.json();
            })
            .then((pokemondata) => {
                console.log(pokemondata.name);

                if (this.state.pokemon.length >= 150) {
                    this.setState(prevState => ({
                        pokemon: [...prevState.pokemon, pokemondata],
                        loaded: true
                    }));
                } else {
                    this.setState(prevState => ({
                        pokemon: [...prevState.pokemon, pokemondata]
                    }));
                }
            })
        }
    }

    render() {
        console.log(this.state);

        if (this.state.loaded) {
            console.log("Load successful");
            console.log(this.state);
        }

        return (
            <div>
                <header>
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        );
    }

}

export default App;
