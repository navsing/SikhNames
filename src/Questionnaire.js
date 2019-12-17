import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import _ from 'lodash';
import './App.css';

const halves = ['Raman', 'Kamal', 'Aman', 'Jas', 'Simran', 'Gur', 'Har', 'Man', 'Bal', 'Nav', 'Sukh', 'Kul', 'Prabh', 'Tar'];
const secondHalves = ['preet', 'meet', 'leen', 'jot', 'winder', 'jeet', 'deep'];

let firstNames = halves.map((item) =>
    <MenuItem value={item}>{item}</MenuItem>
);

export class Questionnaire extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: '',
            firstName: '',
            newName: '',
            showName: false,
            headerColor: 'green'
        }
    }

    validate = (firstName) => {
        const gender = this.state.gender;
        let secondName = _.sample(secondHalves);
        const nonLeen = ['Jas', 'Gur', 'Har', 'Man', 'Prabh'];
        while (_.isEqual(secondName, 'leen') && !_.includes(nonLeen, firstName)) {
           secondName = _.sample(secondHalves);
        }
        const lastName = _.isEqual(gender, 'Boy') ? 'Singh' : 'Kaur';
        return firstName + secondName + ' ' + lastName;
    };

    handleGenderChange = (event) => {
        const gender = event.target.value;
        if (_.isEqual(gender, 'Boy')) {
            this.setState({headerColor: '#3b5998'})
        } else {
            this.setState({headerColor: '#ff42a4'})
        }
        this.setState({gender: event.target.value});
    };

    handleNameChange = (event) => {
        this.setState({firstName: event.target.value});
    };

    resetEverything = () => {
        this.setState({gender: '', firstName: '', newName: '', showName: false});
    };

    showNewName = () => {
        this.setState({showName: true});
        const newName = this.validate(this.state.firstName);
        this.setState({newName: newName});
    };

    render() {
        const gender = this.state.gender;
        const firstName = this.state.firstName;
        return (
        <div>
            <div className='Title' style={{background: this.state.headerColor}}>
                    Sikh Name
                </div>
            <div>
                <div className='gender-ddl'>
                        <FormControl className='formControlGender'>
                         <InputLabel>Gender</InputLabel>
                         <Select
                             labelId='gender'
                             id='gender'
                             value={gender}
                             onChange={this.handleGenderChange}
                         >
                             autoWidth
                             <MenuItem value={'Boy'}>Boy</MenuItem>
                             <MenuItem value={'Girl'}>Girl</MenuItem>
                         </Select>
                     </FormControl>
                 </div>
                 { this.state.gender &&
                     <div className='ResultBody'>
                         <FormControl className='formControlPicker'>
                             <InputLabel>First</InputLabel>
                             <Select
                                 labelId='firstName'
                                 id='firstName'
                                 value={firstName}
                                 onChange={this.handleNameChange}
                             >
                                 {firstNames}
                             </Select>
                         </FormControl>
                     </div>
                 }
                 { this.state.gender && this.state.firstName &&
                     <div className='result'>
                         <div className='find-results'>
                             <Button className='primary-btn' variant="contained" color="primary" onClick={this.showNewName}>
                                 Get Name
                             </Button>
                         </div>
                         <div className='reset-results'>
                             <Button variant="contained" color="secondary" onClick={this.resetEverything}>
                                 Reset
                             </Button>
                         </div>
                     </div>
                 }
                 { this.state.showName &&
                    <div className='final-result'>
                        {this.state.newName}
                    </div>
                 }
                 </div>
            </div>
        )}
    }
export default Questionnaire;