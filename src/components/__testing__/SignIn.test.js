import React from 'react';
import * as enzyme from 'enzyme';
const {shallow} = enzyme;

const Adapter = require('enzyme-adapter-react-16');

import { SignInFormClass } from '../SignIn';

enzyme.configure({ adapter: new Adapter() });

describe('<SignIn />', () => {
    
    const testValues = {
        "firebase": {
            doSignInWithEmailAndPassword: jest.fn().mockResolvedValue(1),
        }
      }

    it('Submit works', () => {
        const component = shallow(
            <SignInFormClass {...testValues} />
        );
        const form = component.find("Form");

        component.find('#email-input').simulate('change', {target: 'john@doe.com'})
        component.find('#pass-input').simulate('change', {target: {value: "passing"}});
        form.simulate('submit');

        expect(testValues.firebase.doSignInWithEmailAndPassword).toHaveBeenCalledTimes(1);
        expect(testValues.firebase.doSignInWithEmailAndPassword).toBeCalledWith(
            "", 
            ""
        );
    });
});