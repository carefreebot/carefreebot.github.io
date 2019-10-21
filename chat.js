function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function() {
  var rules = [
	{ message: '你好，我是青松掌门。你叫什么名字？',
	name: 'name',
	type: 'String',
	replyMessage: '谢谢你， {name}！' },
	{ message: '今天我们要聊聊吗？',
		type: 'SingleChoice',
		options: 
		[ { label: '来，聊啊', next: 'chat' }, { label: '不要，别烦我', next: 'nochat' } ]
	},
	{ message: '你现在干嘛呢～', name: 'chat', type: 'String' },
	{ message: '那你现在心情咋样啊老铁',
		type: 'SingleChoice',
		options: 
		[ { label: '还行吧，正常', next: 'restart' },
			{ label: '很低落啊老铁' },
			{ label: 'High着呢', next: 'high' } ] },
	{ message: '可怜了老铁，抱抱。我想象啊。想要我给你推荐一部电影放松一下吗？还是想我陪你聊会天。',
		type: 'SingleChoice',
		options: [ { label: '聊聊吧' }, { label: '推荐电影', next: 'restart' } ] },
	{ message: '啥原因让你不开心啊，和我说说，咱俩的对话天知地知你知我知', type: 'String' },
	{ message: '恩，我能理解这件事情让你感到难过了。你觉得低落的原因是因为觉得自己没做好吗？',
		type: 'SingleChoice',
		options: [ { label: '是的', next: 'yes' }, { label: '不是', next: 'no' } ] },
	{ message: '明白。有时候我们总是会对自己很苛刻。或许我可以帮你再把这个想法分析一下，看看你会不会好受点。',
		name: 'yes',
		type: 'SingleChoice',
		options: 
		[ { label: '好的，开始吧', next: 'restart' },
			{ label: '我想静一静，以后再说吧', next: 'movie' } ] },
	{ message: '那是你对其他人或者整个事情失望了吗？', name: 'no', next: 'restart' },
	{ message: '好的，这部电影可能适合你现在的心情哦，你可以看一下。记得我随时在你身边。',
		name: 'movie',
		next: 'restart' },
	{ message: '我欲乘风归去，又恐琼楼玉宇，高处不胜寒。老衲去也！',
		name: 'nochat',
		next: 'restart' },
	{ message: '要不要来电死亡金属乐，我们一起rock起来！',
		name: 'high',
		next: 'restart' },
	{ message: '这部分还有待开发，重新开始？',
		type: 'SingleChoice',
		name: 'restart',
		options: 
		[ { label: '重新开始', next: 'name' }, { label: '退出', next: 'exit' } ]
	},
	{ name: 'exit', exit: true }
  ];
  if (document.querySelector('.Chat')) {
    const chat = new YveBot(rules, {
      target: '.Chat',
    });

    chat.actions.define('redirect', (url) => {
      setTimeout(function() {
        window.location.href = url;
      }, 1000);
    });

    chat
      .on('start', function() {
        document.querySelector('.Chat-loading').remove();
      })
      .on('end', function(output) {
        console.log(output);
      })
      .start();
  }
});
