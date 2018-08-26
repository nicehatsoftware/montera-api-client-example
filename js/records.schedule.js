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

(function () {

    'use strict';

    $('#message').html('<strong>Loading...</strong>');

    // make http call to proxy
    $.ajax({
        url: 'proxy.php',
        method: 'GET',
        dataType: 'json'
    }).done(function (data) {

        // construct table header
        var schedule_header = '<tr>';
        schedule_header += '<th>Record Details</th>';
        schedule_header += '<th>Record Code</th>';
        schedule_header += '<th>Function</th>';
        schedule_header += '<th>Function Description</th>';
        schedule_header += '<th>Retention Period</th>';
        schedule_header += '<th>Disposition</th>';
        schedule_header += '</tr>';

        // construct table body containing our schedule records
        var schedule_body = '';

        data.data.forEach(function (record) {

            schedule_body += '<tr>';
            schedule_body += '<td style="width: 5%"><a data-toggle="modal" data-target="#full-record" data-id="' + record._source.nhsm_record_id + '" href="#" class="btn btn-primary btn-xs details">Details</a></td>';
            schedule_body += '<td style="width: 5%">' + record._source.nhsm_functional_record_code + '</td>';
            schedule_body += '<td style="width: 15%">' + record._source.nhsm_functional_function_authority + '</td>';
            schedule_body += '<td>' + record._source.nhsm_functional_description + '</td>';
            schedule_body += '<td>' + record._source.nhsm_retention_period + '</td>';
            schedule_body += '<td>' + record._source.nhsm_disposition_authority + '</td>';
            schedule_body += '</tr>';

        });

        // render the table header and body in the page
        $('#header').html(schedule_header);
        $('#retention-schedule-records').html(schedule_body);

        $('#schedule').DataTable();

        $(document).on('click', '.details', function () {

            var record_id = $(this).data('id');
            var record = data.data.filter(function (obj) {
                return obj._source.nhsm_record_id === record_id;
            });

            var html = '';

            for (var i = 0; i < record.length; i++) {
                html += '<p><strong>Record Code: </strong>' + record[i]._source.nhsm_functional_record_code + '</p>';
                html += '<p><strong>Record Category: </strong>' + record[i]._source.nhsm_functional_record_category_authority + '</p>';
                html += '<p><strong>Function: </strong>' + record[i]._source.nhsm_functional_function_authority + '</p>';
                html += '<p><strong>Function Description: </strong>' + record[i]._source.nhsm_functional_description + '</p>';
                html += '<p><strong>Retention Period: </strong>' + record[i]._source.nhsm_retention_period + '</p>';
                html += '<p><strong>Disposition: </strong>' + record[i]._source.nhsm_disposition_authority + '</p>';
                html += '<p><strong>Vital: </strong>' + record[i]._source.nhsm_is_published + '</p>';
                html += '<p><strong>Approved: </strong>' + record[i]._source.nhsm_is_approved + '</p>';
            }

            $('#record-details').html(html);
        });

        $('#message').html('');

    }).fail(function () {
        console.error('Error: Unable to get schedule records');
    });

})();