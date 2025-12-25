def recommend_distros(user_answers, all_distros):
    recommendations = []

    for distro in all_distros:
        score = 0

        # Scoring System:
        # Must-have --> 20 points
        # Very important --> 15 points
        # Important --> 10 points
        # Nice to have --> 5 points
        # 100 points are the maximum

        # Use Case
        if user_answers['use_case'].lower() in distro['Category'].lower():
            score += 20

        # Experience
        if user_answers['experience'] == 'Beginner' and distro['is_beginner_friendly']:
            score += 15
        elif user_answers['experience'] == 'Intermediate' and distro['is_intermediate_friendly']:
            score += 5

        # Popularity
        if user_answers['popularity'] == "Very Important" and distro['Popularity'] <= 20:
            score += 15
        elif user_answers['popularity'] == "Would be nice" and distro['Popularity'] <= 20:
            score += 5

        # Hardware
        if user_answers['hardware'] == 'Old' and 'old computers' in distro['Category'].lower():
            score += 15

        # GUI
        if user_answers['GUI'] == True and 'desktop' in distro['Category'].lower():
            score += 15

        # Light Weight
        if user_answers['light_weight'] == True and get_avg_size(distro['Image Size (MB)']) <= 1000:
            score += 10

        # Live Medium
        if user_answers['live_medium'] == True and 'live medium' in distro['Category'].lower():
            score += 10

        # Knockout Criterion: Price
        if user_answers['price'] == True and distro['Price'].lower() != 'free':
            score = 0

        # Save total score in object
        distro['match_score'] = score
        recommendations.append(distro)

    # Sort the list: Highes score first
    recommendations.sort(key=lambda x: x['match_score'], reverse=True)

    return recommendations[:3]  # Return top 3


def get_avg_size(size_string):
    try:
        parts = size_string.split('-')
        numbers = [int(s.strip().replace(',', '')) for s in parts if s.strip().isdigit()]

        if len(numbers) == 2:
            return sum(numbers) / 2
        elif len(numbers) == 1:
            return numbers[0]
        return 0
    except:
        return 0