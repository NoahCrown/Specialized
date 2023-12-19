from flask import jsonify

def extract_data(json_data):
    if 'data' in json_data and len(json_data['data']) > 0:
            item = json_data['data'][0]
            fullname = item.get('firstname') + ' ' + item.get('lastname')
            email = item.get('email')
            phone = item.get('phone')
            address = item.get('address', {})
            street = address.get('street', '')
            city = address.get('city', '')
            country = address.get('country', '')
            
            candidate_data = {
                    'fullname': fullname,
                    'email': email,
                    'phone': phone,
                    'street': street,
                    'city': city,
                    'country': country
                }

            return candidate_data
    else:
        return jsonify({'error': 'No data available in the response'}), 404