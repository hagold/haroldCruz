<?php
// ====== CONFIGURE THESE ======
$to = "haroldregoniacruz1003@gmail.com"; // <-- CHANGE TO YOUR EMAIL

// ====== GET FORM DATA ======
$name    = isset($_POST['name'])    ? strip_tags(trim($_POST['name']))    : '';
$email   = isset($_POST['email'])   ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$subject = isset($_POST['subject']) ? strip_tags(trim($_POST['subject'])) : '';
$message = isset($_POST['message']) ? strip_tags(trim($_POST['message'])) : '';

// ====== SIMPLE VALIDATION ======
if ($name && $email && $subject && $message) {
    // (OPTIONAL) SAVE TO DATABASE
    // $db_host = "localhost";
    // $db_user = "root";
    // $db_pass = "";
    // $db_name = "your_db_name";
    // $mysqli = new mysqli($db_host, $db_user, $db_pass, $db_name);
    // if (!$mysqli->connect_error) {
    //     $stmt = $mysqli->prepare("INSERT INTO contact_messages (name, email, subject, message, sent_at) VALUES (?, ?, ?, ?, NOW())");
    //     if ($stmt) {
    //         $stmt->bind_param("ssss", $name, $email, $subject, $message);
    //         $stmt->execute();
    //         $stmt->close();
    //     }
    //     $mysqli->close();
    // }

    // ====== SEND EMAIL ======
    $email_subject = "Website Contact: $subject";
    $email_body = "Name: $name\nEmail: $email\nSubject: $subject\n\nMessage:\n$message\n";
    $headers = "From: $name <$email>\r\nReply-To: $email\r\n";
    mail($to, $email_subject, $email_body, $headers);

    // ====== SUCCESS FEEDBACK ======
    echo "<script>alert('Thank you! Your message was sent.'); window.location.href='index.html#contact';</script>";
    exit;
} else {
    echo "<script>alert('Please fill in all fields.'); window.location.href='index.html#contact';</script>";
    exit;
}
?>
