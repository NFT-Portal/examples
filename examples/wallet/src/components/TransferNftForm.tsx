import React from 'react'
import { Formik, Form, Field } from 'formik';
import { transferNft } from '@nft-portal/wallet';
import * as Yup from 'yup';
import { HttpAgent } from '@dfinity/agent';

const TransferSchema = Yup.object().shape({
  accountId: Yup
  .string()
  .trim()
  .matches(/^[0-9a-f]{64}$/, 'Must be a valid accountID (64 hex characters)')
  .required('Account ID is required.')
});

type Props = {
  agent: HttpAgent,
  nftCollectionId: string;
  tokenId: string;
};

export const TransferNftForm = ({agent, nftCollectionId, tokenId}: Props) => {
  const onSubmit = async (accountId: string) => {
    try {
      const res = await transferNft({
        agent,
        nftCollectionCid: nftCollectionId,
        tokenId: tokenId,
        to: accountId,
      });
      // The response will be the amount transfered, which for NFTs
      // will always be 1.
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Formik
      initialValues={{
        accountId: '',
      }}
      validationSchema={TransferSchema}
      onSubmit={values => {
        onSubmit(values.accountId);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="formRow">
            <div className='column'>
              <p>Collection ID</p>
              <p>{nftCollectionId}</p>
            </div>
            <div>
              <p>token ID</p>
              <p>{tokenId}</p>
            </div>
            <div className='column'>
              <p>AccountId</p>
              <Field name="accountId" type="accountId" />
            </div>
            <button type="submit">Transfer</button>
          </div>
          <div className="errorText">
            {errors.accountId && touched.accountId ? <div>{errors.accountId}</div> : null}
          </div>
        </Form>
      )}
    </Formik>
  )
}
