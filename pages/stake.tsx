import {useEffect, useState} from 'react';
import Head from 'next/head'
import * as Yup from 'yup';
import { useFormik } from 'formik';

import Layout from '../components/layout/layout';

export default function Stake() {
  const schema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email("Invalid email").required('Required'),
    password: Yup.string().required('Required'),
  });

  const form = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: async (values: any) => {
      console.log('values = ', values);
    }
  });

  useEffect(() => {
    form.validateForm();
  }, []);

  return (
    <>
      <Head>
        <title>Stakin: Stake</title>
        <meta name="description" content="Stakin Stake."/>
      </Head>
      <Layout>
        <form className="w-full h-700 flex items-center justify-center" onSubmit={form.handleSubmit}>
          <div className="w-full sm:w-1/2 lg:w-1/3 mx-10 border border-light-400">
            <p className="bg-warning text-white text-16 text-center py-10">SignUp</p>
            <div className="p-15">
              <div className="flex py-5">
                <label className="w-1/3 text-right mr-5">Name:</label>
                <input type="text" className="w-2/3 border border-light-200" name="name" value={form.values.name} onChange={form.handleChange} />
              </div>
              <div className="flex py-5">
                <label className="w-1/3 text-right mr-5">Email:</label>
                <input type="text" className="w-2/3 border border-light-200" name="email" value={form.values.email} onChange={form.handleChange}/>
              </div>
              <div className="flex py-5">
                <label className="w-1/3 text-right mr-5">Password:</label>
                <input type="password" className="w-2/3 border border-light-200" name="password" value={form.values.password} onChange={form.handleChange}/>
              </div>
            </div>
            <div className="py-5 flex justify-center">
              <button className="btn btn-primary btn-sm" disabled={!form.isValid}>Save</button>
            </div>
          </div>
        </form>
      </Layout>
    </>
  );
}
