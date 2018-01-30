import React from "react";
import ReactDOM from "react-dom";
import fetchPokemon from "./fetchPokemon";

class Pokemon extends React.Component {
  state = {
    character: null
  };

  componentDidMount() {
    fetchPokemon(this.props.id, character =>
      this.setState({ character })
    );
  }

  componentWillReceiveProps(nextProps) {
    fetchPokemon(nextProps.id).then(character =>
      this.setState({ character })
    );
  }

  render() {
    return this.state.character ? (
      <div>
        <h2>{this.state.character.name}</h2>

        <h4>Abilities</h4>
        <ul>
          {this.state.character.abilities.map(ability => (
            <li key={ability.slot}>{ability.ability.name}</li>
          ))}
        </ul>
      </div>
    ) : (
      <div>loading...</div>
    );
  }
}

class PokemonPager extends React.Component {
  state = {
    id: 1
  };

  render() {
    return (
      <div>
        <button
          type="button"
          onClick={() =>
            this.setState(({ id }) => ({ id: id - 1 }))}
        >
          Previous
        </button>

        <button
          type="button"
          onClick={() =>
          this.setState(({ id }) => ({ id: id + 1 }))}
        >
          Next
        </button>

        <h2>{this.state.id}</h2>

        <Pokemon id={this.state.id} />
      </div>
    )
  }
}

ReactDOM.render(
  <PokemonPager />,
  document.getElementById("root")
);
