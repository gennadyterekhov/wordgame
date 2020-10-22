'use strict';

const formElement = React.createElement;


class GameWord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            // index: props.key
        };
    }

    render() {
        return (
            <div>
                <span>
                    {/* {this.props.key} */}
                </span> 
                <span>
                    {this.props.value}
                </span>
                <br></br>
            </div>
        );
    }
}









class GameMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.text,
        };
    }
  
    render() {
        return (
            <div>
                <p>{this.props.text}</p>
            </div>
        );
    }
}










class PlayerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            score: props.score
        };
    }

    findPlayerByName(name) {

    }


    render() {
        return (
            <div>{this.state.name} {this.state.score}</div>
        );
    }
}


class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
    }
}















class GamePlayersTable extends React.Component {
    constructor(props) {
        super(props);
        // let number = props.playersNumber;
        // let names = [];
        // for (let i = 1; i <= number; i += 1) {
        //     names.push(`Игрок ${i}`);
        // }
        this.state = {
            playersData: props.playersData,
        };
    }
  
    getPlayerScore(playerName) {
        return 0;
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            {/* <td>#</td> */}
                            <td>игрок</td>
                            <td>очки</td>
                        </tr>

                    </thead>
                    <tbody>

                        {this.state.playersData.map(
                            (value, index) => (
                                <tr key={index}>
                                    {/* <td>{index}</td> */}
                                    <td>{value.name}</td>
                                    <td>{value.score}</td>
                                </tr>
                            )
                        )}

                    </tbody>
                </table>
            </div>
        );
    }
}



// className="players-table-td"
// className="players-table-td"
// className="players-table-td"
// className="players-table-td"
// className="players-table-td"
// className="players-table-td"











class EnterWordForm extends React.Component {
    constructor(props) {
        super(props);



        this.state = {
            placeholder: props.placeholder,
            value: props.value,
            message: props.message,
            mistakes: props.mistakes,
            wordsReverseHtml: props.wordsReverseHtml,
            wordsList: props.wordsList,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    isWord(word) {
        // потом нужно будет сделать через викисловарь если у него есть АПИ
        return true;
    }

    checkWord(word) {
        if (this.state.wordsList.length === 0) {
            return {ok: true, reason: 'Первое слово принимается всегда'};
        } else {
            if (this.state.wordsList.includes(word)) {
                return {ok: false, reason: 'Уже было' }
            }
            let lastWord = this.state.wordsList[this.state.wordsList.length - 1];
            let lastWordLastLetter = lastWord[lastWord.length - 1];


            if (word[0] !== lastWordLastLetter) {
                return {ok: false, reason: 'Слово не начинается на поледнюю букву предыдущего слова'};
            }


            if (!this.isWord) {
                return {ok: false, reason: 'Не удалось определить является ли слово реальным'};
            }
        }
        return {ok: true, reason: 'Слово начинается на поледнюю букву предыдущего слова, и не повторяется'};
    }


    addWordToList(word) {
        let temp = this.state.wordsList;
        temp.push(word);
        this.setState({wordsList: temp});
    }


    handleChange(event) {
        this.setState({value: event.target.value});
    }


    handleSubmit(event) {

        let submittedWord = this.state.value;
        let checkResult = this.checkWord(submittedWord);

        if (checkResult.ok) {
            this.addWordToList(submittedWord);

            let lastWordLastLetter = submittedWord[submittedWord.length - 1];

            this.setState({
                value: '',
                message: `Слово "${submittedWord}" принято. Следующее слово должно начаться с буквы "${lastWordLastLetter}"`,
            });

        } else {
            this.setState({
                mistakes: this.state.mistakes + 1,
                message: `Слово "${submittedWord}" не принято. Причина: ` + checkResult.reason
            })
        }
        this.setState({wordsReverseHtml: this.state.wordsList.slice().reverse()});
        
        // alert('A word was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div id="mainReturnedElement">
                
                 <div id="wordEnterForm">
                    <form onSubmit={this.handleSubmit}>

                        всего слов: {this.state.wordsList.length}
                        <br></br>
                        {/* всего ошибок: {this.state.mistakes}
                        <br></br> */}

                        <GameMessage text={this.state.message}></GameMessage>
                        <br></br>

                        <input
                            type="text"
                            // player_index={this.state.currentPlayerIndex}
                            // player={this.state.currentPlayerName}
                            placeholder={this.state.placeholder}
                            value={this.state.value} 
                            onChange={this.handleChange}
                        />
                        <span> </span>
                        <input type="submit" value="Отправить" />
                    </form>

                </div>
                <div id="wordsTable">
                    {this.state.wordsReverseHtml.map(
                        (value, index) => (
                            <GameWord value={value} key={index} />
                        )
                    )}
                </div> 
            </div>
        );
    }
}






class MainGameComponent extends React.Component {
    constructor(props) {
        super(props);

        // let players = [
        //     new Player({
        //         name: 'Игрок 1',
        //         score: 0
        //     }),
        //     new Player({
        //         name: 'Игрок 2',
        //         score: 0
        //     })
        // ];
        let players = [
            new Player('Игрок 1'),
            new Player('Игрок 2')
        ];

        this.state = {
            placeholder: 'введите ваше слово сюда',
            value: '',
            message: 'Игра началась. Введите ваше первое слово',
            mistakes: 0,
            wordsReverseHtml: [],
            wordsList: [],
            playersData: players,
        };
    }

    render() {
        return (
            <div className="row">
                <div className="col">
                    <EnterWordForm
                        placeholder={this.state.placeholder}
                        value={this.state.value}
                        message={this.state.message}
                        mistakes={this.state.mistakes}
                        wordsReverseHtml={this.state.wordsReverseHtml}
                        wordsList={this.state.wordsList}
                        handleSubmit={this.handleSubmit}
                    />
                </div>
                <div className="col">
                    <GamePlayersTable playersData={this.state.playersData} />
                </div>
            </div>
        );
    }
}



const domContainer = document.querySelector('#reactRoot');

ReactDOM.render(<MainGameComponent />, domContainer);




