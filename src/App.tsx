import { TextInput, Button } from '@mantine/core';
import { useEffect, useState } from 'react';

import { collection } from 'firebase/firestore'
import { db } from './api/firebase.config';

import { createUser, getUsers } from './utils/users.utils';
import { useForm } from '@mantine/form';

export const App = () => {
	//obtenir la base de données 'users'
	const usersCollection = collection(db, 'users')
	//enregistrer les utilisateurs localement
	const [users, setUsers] = useState<any>([])

	//form et validation du remplissage des données
	const form = useForm({
		initialValues: {
			name: ''
		},
		validate: {
			name: (value) => (value.length < 2 ? 'Écrivez un nom !' : null)
		}
	})

	//obtenir des données de la base de données lors de l'entrée sur le site
	useEffect(() => {
		getUsers(setUsers, usersCollection)
	}, [createUser])


	return (
		<div className='text-[#35383a] h-screen flex flex-col'>
			<div className='flex gap-4 bg-[#f4f4f4] p-8 justify-center items-center'>
				<img className='max-w-[12rem]' src="https://www.wildcodeschool.com/assets/logo_main-e4f3f744c8e717f1b7df3858dce55a86c63d4766d5d9a7f454250145f097c2fe.png" alt="Wild Code School logo" />
				<div className='font-semibold text-3xl'>Les Argonautes</div>
			</div>
			<div className='flex justify-center gap-8 my-auto'>
				<div>
					<div className='max-w-md shadow-md mt-8 rounded-md p-4'>
						<div className='text-center font-semibold text-3xl mb-6'>Ajouter un(e) Argonaute</div>
						<form onSubmit={form.onSubmit((values) => {
							//envoyer des données à la base de données
							createUser(usersCollection, values.name)
							users.push(values)
							setUsers(users)
						})}>
							<TextInput
								withAsterisk
								label="Nom de l'Argonaute"
								placeholder='John'
								{...form.getInputProps('name')}
							/>
							<div className='flex justify-end'>
								<Button type='submit' className='bg-[#ED6C6D] hover:bg-[#ED6C6D] mt-4'>Envoyer</Button>
							</div>
						</form>
					</div>
				</div>

				<div className='max-w-md shadow-md mt-8 rounded-md p-4'>
					<div className='text-center font-semibold text-3xl mb-6'>Membres de l'équipage</div>
					<div className='grid grid-cols-3 text-center'>
						{/* nous annonçons tous les utilisateurs qui sont localement */}
						{users.map((user: { name: string, id: number }, index: number) => <div key={index}>{user.name}</div>)}
					</div>
				</div>
			</div>
			<div className='bg-[#ED6C6D] p-4 mt-auto'>
				<div className='text-white text-center'>Réalisé par Jason en Anthestérion de l'an 515 avant JC</div>
			</div>
		</div>
	)
}