import React from "react";
import ReactDOM from "react-dom";

const fetchPokemon = (id, callback) =>
  fetch(`https://d1s1rehmg7ei44.cloudfront.net/api/v2/pokemon/${id}/`)
    .then(res => res.json())
    .then(callback);

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
    console.dir(this.state.character);
    
    return this.state.character ? (
      <div>
        <h2>{this.state.character.name}</h2>
        <ul>
          {this.state.character.abilities.map((abilitie) => {
            return <li key={abilitie.slot}>{abilitie.ability.name}</li>
          })}
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
