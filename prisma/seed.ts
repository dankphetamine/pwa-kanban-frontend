import { PrismaClient } from '@prisma/client';
import argon2id from 'argon2';

const prisma = new PrismaClient();
const pass = process.env.PASSWORD!;

async function main() {
	const a = await prisma.user.upsert({
		where: { email: 'smsj@easv.dk' },
		update: {
			email: 'smsj@easv.dk',
			name: 'Søren',
			image: 'https://www.easv.dk/app/uploads/2017/09/SMSJ_06_150x150_acf_cropped_quality-85.jpg',
		},
		create: {
			email: `smsj@easv.dk`,
			password: await argon2id.hash([pass].reverse().join()),
			name: 'Søren',
			image: 'https://www.easv.dk/app/uploads/2017/09/SMSJ_06_150x150_acf_cropped_quality-85.jpg',
			posts: {
				create: {
					title: 'Lorem ipsum dolor sit amet.',
					content: 'Ut sem metus, auctor tincidunt elementum',
					published: true,
				},
			},
		},
	});
	const b = await prisma.user.upsert({
		where: { email: 'kw@easv.dk' },
		update: {
			email: 'kw@easv.dk',
			name: 'Kristian',
			image: 'https://www.easv.dk/app/uploads/2017/09/KW_03_150x150_acf_cropped_quality-85.jpg',
		},
		create: {
			email: `kw@easv.dk`,
			password: await argon2id.hash([pass].reverse().join()),
			name: 'Kristian',
			image: 'https://www.easv.dk/app/uploads/2017/09/KW_03_150x150_acf_cropped_quality-85.jpg',
			posts: {
				create: [
					{
						title: 'Nunc ullamcorper mauris non magna egestas',
						content: 'Sed eget sodales ex, id porta nisi. Aliquam vitae magna id nisi faucibus dignissim ac ac sapien',
						published: true,
					},
					{
						title: 'Vestibulum blandit ligula et eros tincidunt',
						content:
							'Sed eget felis et tortor scelerisque convallis non non turpis. In id sollicitudin lectus, quis euismod enim. Curabitur sagittis, felis eu porta facilisis, turpis quam aliquet enim, vel tincidunt mauris neque ac nisl. Aliquam eu porta mauris. Ut a ultrices diam',
						published: true,
					},
				],
			},
		},
	});

	const c = await prisma.user.upsert({
		where: { email: 'asge0907@easv365.dk' },
		update: {
			email: 'asge0907@easv365.dk',
			name: 'Asger Storm',
			image:
				'https://cdn.shopify.com/s/files/1/0160/2840/1712/products/cheems_characterai_ry-min_739x.png?v=1606473176',
		},
		create: {
			email: 'asge0907@easv365.dk',
			password: await argon2id.hash(pass),
			name: 'Asger Storm',
			image:
				'https://cdn.shopify.com/s/files/1/0160/2840/1712/products/cheems_characterai_ry-min_739x.png?v=1606473176',
			posts: {
				create: [
					{
						title: 'Amazing',
						content: "I'm on a seafood diet. I see food and I eat it.",
						published: true,
					},
					{
						title: 'Great',
						content: 'Why did the scarecrow win an award? Because he was outstanding in his field.',
						published: true,
					},
					{
						title: 'Cool',
						content: 'I made a pencil with two erasers. It was pointless.',
						published: true,
					},
					{
						title: 'Soon',
						content: "I've got a great joke about construction, but I'm still working on it.",
						published: true,
					},
				],
			},
		},
	});
	console.log({ a, b, c });
}
main()
	.catch(e => {
		console.error(e);
		process.exit();
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
