'use strict';

const formElement = React.createElement;


class MainGameComponent extends React.Component {
    constructor(props) {
        super(props);

        let players = [
            {name: 'Игрок 1', score: 0},
            {name: 'Игрок 2', score: 0}
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
        console.log('addWordToList');
        let temp = this.state.wordsList.slice();
        temp.push(word);
        this.setState({wordsList: temp});
        console.log('this.state');
        console.log(this.state.wordsList);
    }


    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        console.log('handleSubmit');
        console.log(this.state.wordsList);

        let submittedWord = this.state.value;
        let checkResult = this.checkWord(submittedWord);
        let message = '';
        let updatedWordList = this.state.wordsList.slice();

        let updatedPlayersData = this.state.playersData.slice();
        const currentPlayerIndex = this.state.wordsList.length % 2;
        

        if (checkResult.ok) {
            console.log('[handleSubmit] about to add a word to list');
            // this.addWordToList(submittedWord);
            updatedWordList.push(submittedWord);
            console.log('[handleSubmit] after addition to list');
            console.log(this.state.wordsList);

            let lastWordLastLetter = submittedWord[submittedWord.length - 1];

            updatedPlayersData[currentPlayerIndex].score += 1;
            // 
            // 
            // 
            
            // this.setState({
            //     value: '',
            //     message: `Слово "${submittedWord}" принято. Следующее слово должно начаться с буквы "${lastWordLastLetter}"`,
            //     // playersData: updatedPlayersData,
            // });
            message = `Слово "${submittedWord}" принято. Следующее слово должно начаться с буквы "${lastWordLastLetter}"`;
            console.log(this.state);

        } else {
            // this.setState({
            //     mistakes: this.state.mistakes + 1,
            //     message: `Слово "${submittedWord}" не принято. Причина: ` + checkResult.reason
            // })
            message = `Слово "${submittedWord}" не принято. Причина: ` + checkResult.reason;
        }

        console.log(this.state.wordsList);





        this.setState({
            value: '',
            message,
            wordsList: updatedWordList,
            playersData: updatedPlayersData
            // wordsReverseHtml: this.state.wordsList.slice().reverse()
        });

        console.log(this.state.wordsList);

        event.preventDefault();
    }



    render() {
        return (
            <div className="row">
                <div className="col">


                    всего слов: {this.state.wordsList.length}
                    <br></br>

                    {this.state.message}

                    <br></br>

                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            placeholder={this.state.placeholder}
                            value={this.state.value} 
                            onChange={this.handleChange}
                        />
                        <span> </span>
                        <input type="submit" value="Отправить" />
                    </form>

                    <br></br>
                    <ol reversed>
                        {this.state.wordsList.slice().reverse().map(
                            (value, index) => (
                                <li key={index}> {value}</li>
                            )
                        )}
                    </ol>
                </div>


                <div className="col">

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
            </div>
        );
    }
}



const domContainer = document.querySelector('#reactRoot');

ReactDOM.render(<MainGameComponent />, domContainer);




