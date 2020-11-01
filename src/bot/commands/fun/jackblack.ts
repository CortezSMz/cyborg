import CyborgCommand from '../../structures/CyborgCommand';
import { Message } from 'discord.js';

export default class JackblackCommand extends CyborgCommand {
	public constructor() {
		super('jackblack', {
			category: 'fun',
		});
	}

	public exec(msg: Message) {
		const jacks = [
			'https://br.web.img2.acsta.net/pictures/18/09/04/21/08/2345092.jpg',
			'https://m.media-amazon.com/images/M/MV5BYTFiMWNlNmItMDRiYy00NzA4LWE5YjItZmViNWQ2NzhhOWZlXkEyXkFqcGdeQXVyMTA2Mjc5ODMy._V1_.jpg',
			'https://vegazeta.com.br/wp-content/uploads/2020/01/635802462956525918-JackBlack-1200x900.jpg',
			'https://okdiario.com/img/2016/06/06/jack-black-655x368.jpg',
			'https://lh3.googleusercontent.com/proxy/_srQITKaVlimNXwzK8c9u8WBDWmBjue7zFF7p7l6zDmlHkdtnPo5uJnUcFED3ZU2gHeFUwCPTqLB6fB8jKEhhV36edIV7N5-U1MqD4HHTOmrBzmtUx_zqq2Ky8OwrI9h_dEanQi1nfE',
			'https://i1.wp.com/www.uselessdaily.com/wp-content/uploads/2017/06/8e10bee9e4baa959b3df2724c5126a0f.jpg?fit=2409%2C1750&ssl=1',
			'https://d2skuhm0vrry40.cloudfront.net/2018/articles/2018-12-27-08-27/Jack_Black_School_Rock.jpg/EG11/thumbnail/750x422/format/jpg/quality/60',
			'https://media.discordapp.net/attachments/227176018018828288/765709551223308318/unknown.png',
		];
		msg.util?.send(jacks[Math.floor(Math.random() * jacks.length)]);
	}
}
