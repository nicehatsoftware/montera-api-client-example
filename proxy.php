<?php

/*

MIT License

Copyright (c) 2018 nicehatsoftware

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Author: https://www.nicehatsoftware.com

*/
	
   //----------CONFIG-----------//
    $api_schedule_url = '';
    $api_key = '';
    $tenant_id = '';
   //---------------------------//

   header('Content-Type: application/json');

   $headers = [
        'x-api-key: ' . $api_key,
        'x-montera-tid: ' . $tenant_id
   ];

   $ch = curl_init();
   curl_setopt($ch, CURLOPT_URL, $api_schedule_url);
   curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
   curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
   $response = curl_exec ($ch);
   curl_close ($ch);

   $json = json_decode($response);

   if ($json->status != 200) {
        $error = array(
            'message' => 'Error: API request failed.'
        );

        echo json_encode($error);

        exit;
   }

   echo json_encode($json);

   exit;

?>