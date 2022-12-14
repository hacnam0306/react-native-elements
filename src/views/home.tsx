import * as React from 'react';
import {ScrollView, View} from 'react-native';
import {useTheme} from '@rneui/themed';
import {Header} from '../components/header';
import {faker} from '@faker-js/faker';
import * as Yup from 'yup';
import {FormBuilder, InputVTProps} from '../theme/form/formbuilder';
import {getSelectOptions} from '../faker/selectOptionsFaker';
import {phone} from 'phone';

export function Home() {
  const {theme} = useTheme();

  const inputs: InputVTProps[] = [
    {
      type: 'DateTime',
      inputKey: 'ip_datetime',
      validation: Yup.string().required('Required'),

      inputProps: {
        label: `DateTime`,
        placeholder: faker.lorem.word(),
        dateTimeProps: {
          mode: 'datetime',
        },
      },
    },
    {
      type: 'DateTime',
      inputKey: 'ip_date',
      validation: Yup.string().required('Required'),

      inputProps: {
        label: `Date`,
        placeholder: faker.lorem.word(),
        dateTimeProps: {
          mode: 'date',
        },
      },
    },
    {
      type: 'DateTime',
      inputKey: 'ip_time',
      validation: Yup.string().required('Required'),

      inputProps: {
        label: `Time`,
        placeholder: faker.lorem.word(),
        dateTimeProps: {
          mode: 'time',
        },
      },
    },
    {
      type: 'Text',
      inputKey: 'input1',
      initValue: '2313131 12',
      validation: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),

      inputProps: {
        label: `TextInput - ${faker.lorem.word()}`,
        placeholder: faker.lorem.word(),
      },
    },
    {
      type: 'Text',
      inputKey: 'text_email',
      // initValue: '',
      validation: Yup.string().email().required('Required'),

      inputProps: {
        label: `TextInput Email - ${faker.lorem.word()}`,
        placeholder: faker.lorem.word(),
      },
    },
    {
      type: 'PhoneNumber',
      inputKey: 'text_phone_number',
      initValue: '',
      validation: Yup.string()
        .test(
          'phone_validate',
          "this isn't the number i want",
          value => phone(value || '').isValid,
        )
        .required('Required'),

      inputProps: {
        label: `PhoneNumber - ${faker.lorem.word()}`,
        placeholder: faker.phone.number(),
      },
    },
    {
      type: 'Text',
      inputKey: 'text_password',
      // initValue: '',
      validation: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
        .required('Required'),

      inputProps: {
        label: `Password`,
        placeholder: faker.lorem.word(),
        secureTextEntry: true,
      },
    },
    {
      type: 'Text',
      inputKey: 'text_number',
      // initValue: '',
      validation: Yup.number().required('Required'),

      inputProps: {
        label: `TextInput Number`,
        placeholder: faker.lorem.word(),
        keyboardType: 'numeric',
      },
    },
    {
      type: 'Select',
      options: getSelectOptions,
      multiple: false,
      inputKey: 'input2',
      validation: Yup.string().required('Required'), // TODO_ làm lại validation

      inputProps: {
        label: `SelectInput - ${faker.lorem.word()}`,
        placeholder: faker.lorem.word(),
      },
    },
    {
      type: 'Select',
      options: getSelectOptions,
      multiple: true,
      inputKey: 'input3',
      validation: Yup.string().required('Required'), // TODO_ làm lại validation

      inputProps: {
        label: `MultipleSelectInput - ${faker.lorem.word()}`,
        placeholder: faker.lorem.word(),
      },
    },
    {
      type: 'TextTags',
      // options: getSelectOptions,
      // multiple: true,
      inputKey: 'input4',
      validation: Yup.string().required('Required'), // TODO_ làm lại validation

      inputProps: {
        label: `TextTagsInput - ${faker.lorem.word()}`,
        placeholder: faker.lorem.word(),
      },
    },
    {
      type: 'Text',
      inputKey: 'input5',
      validation: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),

      inputProps: {
        label: `Text - ${faker.lorem.word()}`,
        placeholder: faker.lorem.word(),
      },
    },
  ];

  return (
    <>
      <Header title="Home" view="Home" />
      <ScrollView>
        <View
          style={{
            backgroundColor: theme.colors.background,
            flex: 1,
          }}>
          <FormBuilder inputs={inputs} />
        </View>
      </ScrollView>
    </>
  );
}
