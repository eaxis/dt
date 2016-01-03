<?
	if (isset($_POST['data'])) {
		date_default_timezone_set('Europe/Moscow');

		//setcookie('dt_settings', base64_encode(time()), 0, '/'); // Deception for revrese engineers

		$data = explode("-", base64_decode($_POST['data']));

		$response = file_get_contents('https://api.vk.com/method/likes.getList?type=sitepage&owner_id=' . $data[0] . '&page_url=' . $_SERVER['HTTP_HOST'] . '/?dt_id=' . $data[1]);
		$decoded = json_decode($response)->response->users[0];

		$name = file_get_contents('https://api.vk.com/method/users.get?user_ids=' . $decoded . '&lang=ru');
		$name = json_decode($name, true)['response'][0]['first_name'];
		setcookie('dt_settings', base64_encode(urlencode($name)), 0, '/');

		file_put_contents('dt_logs.php', "\n//" . date("Y.m.d H:i:s") . ": " . $_SERVER["REMOTE_ADDR"] . " | vk.com/id" . $decoded, FILE_APPEND);
	}
?>