import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import useSwr from 'swr';
import fetcher from '../utils/fetcher';

interface User {
	_id: string;
	email: string;
	name: string;
	createdAt: string;
	updatedAt: string;
	_v: number;
	session: string;
	iat: string;
	exp: string;
}
//swr is for handling the loading data states and errors
const Home: NextPage<{ fallbackData: User }> = ({ fallbackData }) => {
	const { data } = useSwr<User | null>(
		`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
		fetcher,
		{ fallbackData }
	);

	if (data) {
		return <div> Welcome {data.name}</div>;
	}
	return <div className={styles.container}>Please log in</div>;
};

//get server side props for fetching data in the server

export const getServerSideProps: GetServerSideProps = async (context) => {
	//pass our headers
	//context.req.headers
	const data = await fetcher(
		`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
		context.req.headers
	);

	return { props: { fallbackData: data } };
};

export default Home;
