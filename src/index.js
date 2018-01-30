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

ReactDOM.render(
  <Pokemon id={1} />,
  document.getElementById("root")
);
